import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { isLocale, type Locale } from "@/lib/site/locales";

const DAILY_LIMIT = 10;
const recipient = "dev.arn.ml@gmail.com";
const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(3).max(40),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0).optional(),
  locale: z.string().refine(isLocale),
});

const counters = new Map<string, { day: string; count: number }>();

function clientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const expected = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  return origin === expected || origin === request.nextUrl.origin;
}

function redirectToContact(
  request: NextRequest,
  locale: Locale,
  status: "sent" | "error" | "limited",
) {
  const url = new URL(`/${locale}/contact`, request.url);
  url.searchParams.set("status", status);
  return NextResponse.redirect(url, 303);
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const localeValue = String(formData.get("locale") || "en");
  const locale = isLocale(localeValue) ? localeValue : "en";
  if (!isSameOrigin(request))
    return redirectToContact(request, locale, "error");

  const key = clientIp(request);
  const day = new Date().toISOString().slice(0, 10);
  const current = counters.get(key);
  const count = current?.day === day ? current.count : 0;
  if (count >= DAILY_LIMIT)
    return redirectToContact(request, locale, "limited");

  let input: z.infer<typeof contactSchema>;
  try {
    input = contactSchema.parse(Object.fromEntries(formData.entries()));
  } catch {
    return redirectToContact(request, locale, "error");
  }

  if (input.website) return redirectToContact(request, locale, "sent");
  counters.set(key, { day, count: count + 1 });

  try {
    if (!process.env.RESEND_API_KEY)
      throw new Error("RESEND_API_KEY is not configured");
    const result = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL || "Arnold Moya <onboarding@resend.dev>",
      to: [recipient],
      subject: `New contact message from ${input.name}`,
      text: `Name: ${input.name}\nContact number: ${input.phone}\nLocale: ${input.locale}\n\nMessage:\n${input.message}`,
    });
    if (result.error) throw new Error(result.error.message);
  } catch (error) {
    console.error("Contact email failed", error);
    return redirectToContact(request, locale, "error");
  }

  return redirectToContact(request, locale, "sent");
}
