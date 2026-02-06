# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server at http://localhost:3000
- `pnpm build` - Build the production bundle
- `pnpm lint` - Run ESLint (9+ flat config in `eslint.config.mjs`)
- `pnpm test` - Run Vitest test suite
- `pnpm test -- tests/api/subscribe.test.ts` - Run a single test file
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm prisma generate` - Generate Prisma Client (output at `app/generated/prisma`)
- `pnpm prisma migrate dev --name <name>` - Create and apply migrations
- `pnpm prisma studio` - Open interactive database browser

## Architecture

### Tech Stack

- **Framework**: Next.js 16 with App Router
- **Database**: PostgreSQL via Prisma 7 ORM with `@prisma/adapter-pg` driver adapter
- **Authentication**: Iron-session (cookie-based HTTP-only sessions)
- **Content**: MDX via `next-mdx-remote-client/rsc` (`<MDXRemote source={content} />`)
- **Validation**: Zod schemas in `lib/validators.ts` and `lib/validation/`
- **UI**: React 19, Tailwind CSS 4, Radix UI, Lucide icons, Framer Motion
- **Testing**: Vitest (globals enabled) with jsdom, React Testing Library
- **Email**: Resend + React Email templates in `components/email/`

### Key Architecture Decisions

**Prisma Client Setup** (`lib/prisma.ts`): Uses `@prisma/adapter-pg` with a `Pool` connection from the `pg` library. Client is output to `app/generated/prisma` (not the default location). Singleton pattern prevents multiple instances in development.

**Proxy** (`proxy.ts`): Next.js 16 uses `proxy.ts` (not `middleware.ts`). Handles:
- Rate limiting on all `/api/*` routes (10 requests/60s per IP, in-memory store in `lib/rate-limit.ts`)
- Auth protection for `/admin/*` (redirect to `/login`) and `/api/admin/*` (401 JSON)
- Session check via `arnml_admin_session` cookie presence

**Auth Flow**: Single admin password (`ADMIN_PASSWORD` env var) verified at `/login`. Session managed by iron-session (`lib/session.ts`), expires in 1 week. Use `requireAuth()` from `lib/auth.ts` for extra safety in API route handlers.

### Project Structure

```
app/
  (public)/                    # Public layout group
    blog/, news/               # Listing + [slug] detail pages
    confirmed/, unsubscribed/  # Subscription status pages
    newsletter/es/             # Newsletter page
    page.tsx                   # Home page
  admin/                       # Protected (auto-redirect to /login)
    blog/, news/               # CRUD: list, new, [id]/edit
    subscribers/               # Subscriber list
    page.tsx                   # Dashboard with stats
  api/
    subscribe/                 # POST subscribe, confirm/[id] confirmation
    unsubscribe/[id]/          # Unsubscribe endpoint
    admin/send/[emailid]/      # Protected: send newsletter email
  generated/prisma/            # Auto-generated Prisma Client

lib/
  prisma.ts                    # Prisma singleton with pg adapter
  auth.ts, session.ts          # Auth helpers and iron-session config
  validators.ts                # Zod schemas (subscribe, article, news, publishToggle)
  validation/                  # Additional validators (article.ts, news.ts)
  rate-limit.ts                # In-memory sliding-window rate limiter
  slug.ts                      # slugify() and randomDigits() helpers
  utils.ts                     # General utilities (cn for classnames)

components/
  email/                       # React Email templates (confirm, news)
  ui/                          # Base UI components (Radix-based)
  delete-confirm-button.tsx    # Client component for delete with confirmation dialog
  article-form.tsx, news-form.tsx  # Client form components
  subscribe-form.tsx, home-subscribe-form.tsx  # Subscription forms

proxy.ts                       # Next.js proxy: rate limiting + auth protection
```

### Data Models

Three models in `prisma/schema.prisma`:

- **Article** - Blog content (MDX). Key fields: slug (unique), title, description, content, tags[], language (ES/EN), published, publishedAt
- **NewsItem** - Newsletter items (MDX). Key fields: slug (unique), title, summary, content, language, published, publishedAt, emailSent, emailSentAt
- **Subscriber** - Newsletter subscribers. Key fields: email (unique), status (ACTIVE/UNSUBSCRIBED), emailConfirmed, emailConfirmedAt

Enums: `Language` (ES, EN), `SubscriberStatus` (ACTIVE, UNSUBSCRIBED)

### Type Safety

- TypeScript strict mode enabled
- Path alias `@/*` resolves to repository root
- Generated Prisma types: `import { ... } from '@/app/generated/prisma/client'`

## Common Development Tasks

### Adding a New Admin Page

1. Create page in `app/admin/<feature>/page.tsx` - proxy auto-protects it
2. For interactive elements in server components, extract into separate `'use client'` components (see `delete-confirm-button.tsx` pattern)

### Creating API Routes

- Public: `app/api/<endpoint>/route.ts` (rate-limited by proxy)
- Admin: `app/api/admin/<endpoint>/route.ts` (auto-protected + rate-limited)
- Validate input with Zod schemas from `lib/validators.ts`

### Database Migrations

1. Update `prisma/schema.prisma`
2. Run `pnpm prisma migrate dev --name <migration_name>`
3. Commit the migration file in `prisma/migrations/`

## Testing

- Tests live in `tests/` organized by `tests/api/` and `tests/lib/`
- Vitest globals enabled - no need to import `describe`, `it`, `expect`
- `tests/setup.ts` globally mocks `next/navigation` (useRouter, usePathname, useSearchParams, redirect, notFound)
- Run single test: `pnpm test -- tests/api/subscribe.test.ts`

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key (min 32 chars)
- `ADMIN_PASSWORD` - Admin login password
- `RESEND_API_KEY` - For email sending via Resend
