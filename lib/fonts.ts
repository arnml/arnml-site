import { IBM_Plex_Mono, Manrope, Source_Serif_4 } from "next/font/google";

export const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-site-sans",
  display: "swap",
});

export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-site-mono",
  display: "swap",
});

export const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-site-serif",
  display: "swap",
});
