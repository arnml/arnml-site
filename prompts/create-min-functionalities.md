# Goal

Implement the described public routes, subscribe API, and password-only admin auth + protected admin CRUD (pages + APIs) in the existing arnml-site Next.js App Router project, aligned with the current Prisma/Neon DB status, with minimal/simple UI scaffolding (styling to be improved later).

## Invariants / Acceptance

- Public pages (`/`, `/blog`, `/blog/[slug]`, `/news`, `/news/[slug]`) render only `published=true` content and compile MD/MDX stored in DB.
- `POST /api/subscribe` validates with Zod and upserts Subscriber with the exact status behavior specified; returns JSON `{ ok: true }` on success.
- Admin auth is server-enforced: middleware protects `/admin/**` and API guard protects `/api/admin/**` (no client-only protection).
- Admin login compares submitted password to `ADMIN_PASSWORD` and sets an httpOnly session cookie.
- Admin CRUD APIs exist with Zod validation and Prisma integration for Articles + NewsItems including publish toggle.
- Minimal, functional admin UI pages exist (simple forms + lists). No heavy styling; keep components basic and easy to replace.
- Include tests (API-focused at minimum; add basic middleware/auth guard coverage if feasible).
- Do not introduce unnecessary new architecture or refactors; prefer minimal diffs consistent with current codebase patterns.

## Scope

### In-scope

#### Public routes

- `GET /` landing (latest news + latest blog + subscribe form)
- `GET /blog` list published articles (optional language filter default ES)
- `GET /blog/[slug]` render published article by slug (MDX)
- `GET /news` list published news items
- `GET /news/[slug]` render published news item by slug (MDX)

#### Subscribe API

- `POST /api/subscribe` with Zod email validation + upsert Subscriber logic

#### Admin auth

- `GET /admin/login` password form
- `POST /api/admin/login` sets signed session cookie
- `POST /api/admin/logout` clears cookie
- Middleware protection for `/admin/**` redirect to `/admin/login`
- API protection for `/api/admin/**` returns 401

#### Admin pages (minimal UI)

- `GET /admin` dashboard links
- CRUD pages for blog/news and subscribers list

#### Admin APIs (protected)

- Blog: create, update, publish toggle
- News: create, update, publish toggle
- Subscribers list endpoint OR server component direct fetch (choose one; keep simple)

#### Lib utilities

- `lib/prisma.ts`, `lib/auth.ts`, `lib/mdx.ts`, `lib/validators.ts`

#### Tests

- Subscribe behavior tests (new, existing ACTIVE, existing UNSUBSCRIBED → re-ACTIVE)
- Admin auth tests (login sets cookie; protected route returns 401/redirect)
- CRUD API smoke tests (create/update/publish toggle) if time permits

### Out-of-scope

- Advanced frontend design, complex layouts, or final CSS polish (simple scaffolding only)
- Resend integration (placeholder helper OK)
- Unsubscribe flow (`GET /unsubscribe?token=...`) beyond leaving "space"/notes
- Role-based auth, usernames, OAuth, multi-admin accounts
- Extensive refactors, schema changes unless strictly required to match existing migrated models

## Files / Surface Area

### App Routes

- `app/page.tsx`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/news/page.tsx`
- `app/news/[slug]/page.tsx`
- `app/admin/login/page.tsx`
- `app/admin/page.tsx`
- `app/admin/blog/page.tsx`
- `app/admin/blog/new/page.tsx`
- `app/admin/blog/edit/[id]/page.tsx`
- `app/admin/news/page.tsx`
- `app/admin/news/new/page.tsx`
- `app/admin/news/edit/[id]/page.tsx`
- `app/admin/subscribers/page.tsx`

### API Routes

- `app/api/subscribe/route.ts`
- `app/api/admin/login/route.ts`
- `app/api/admin/logout/route.ts`
- `app/api/admin/blog/route.ts`
- `app/api/admin/blog/[id]/route.ts`
- `app/api/admin/blog/[id]/publish/route.ts`
- `app/api/admin/news/route.ts`
- `app/api/admin/news/[id]/route.ts`
- `app/api/admin/news/[id]/publish/route.ts`

### Components

- `components/SiteHeader.tsx`
- `components/SiteFooter.tsx`
- `components/SubscribeForm.tsx`
- `components/PostCard.tsx`
- `components/AdminPostEditor.tsx`

### Lib Utilities

- `lib/prisma.ts`
- `lib/auth.ts`
- `lib/mdx.ts`
- `lib/validators.ts`

### Other

- `middleware.ts`
- Tests folder (depending on current setup): `__tests__/...` or `tests/...` (match repo convention)

### Environment Variables

- Use existing `DATABASE_URL`, `ADMIN_PASSWORD`
- Add `SESSION_SECRET` if not present (recommended minimal signed-cookie approach)

## Verification

### Tests

- API: `POST /api/subscribe` (3 cases) with DB assertions via Prisma
- API: `POST /api/admin/login` sets httpOnly cookie; invalid password returns 401
- API: any `/api/admin/*` returns 401 when not authed
- Middleware: `/admin` redirects to `/admin/login` when not authed (basic integration or unit if supported)
- Optional: CRUD API smoke (create/update/publish toggle) for blog + news

### Checks/Commands

- `pnpm lint` (or project equivalent)
- `pnpm test` (or `npm test`/`vitest`)
- `pnpm build` to ensure Next.js app compiles
- Prisma: `prisma validate` and `generate` if needed

### "Fail-first" Expectation

Before implementation, at least one test should fail (or missing routes should 404) demonstrating the gap; after changes, tests pass and routes exist.

## Assumptions

- Prisma models and migrations for `Article`, `NewsItem`, `Subscriber`, `Language`, `SubscriberStatus` already exist and match the fields needed (title/slug/summary/content/language/published/publishedAt timestamps, etc.). If field names differ, adapt code to current schema without changing DB unless necessary.
- The repo already has a test runner set up (Vitest/Jest). If not, add the minimal setup required to test route handlers without overhauling tooling.
- MDX compilation can be implemented server-side with a minimal helper; if an MDX library is already installed/used, reuse it.
- Admin UI forms can use server components + minimal client components only where needed (e.g., editor textarea, submit handlers).
- Cookie session approach: use signed cookie with `SESSION_SECRET` if allowed; otherwise fallback to a simple env-token cookie (but prefer signing).

## Final Agent Prompt (copy/paste)

```
You are implementing missing functionality in an existing Next.js App Router project ("arnml-site") using Prisma + Neon Postgres. Implement the routes/APIs/admin system described below with minimal UI scaffolding. Do NOT do fancy CSS; keep layout simple and functional. The frontend design will be revisited later.

You MUST consider the current repository status first: inspect existing schema, routes, libs, and patterns and adapt accordingly with minimal diffs.

Reference agent guidance for endpoints/architecture in:

@C:\Users\amoya\.claude\agents\typescript-pro.md

@C:\Users\amoya\.claude\agents\backend-architect.md

### Repo reconnaissance (required)

- Inspect Prisma schema and existing migrations; confirm field names/types for Article, NewsItem, Subscriber, Language, SubscriberStatus.
- Inspect existing app/ routes, any existing API handlers, middleware, auth utilities, MDX utilities, and component conventions.
- Identify current test framework and folder structure (Vitest/Jest, etc.).

### Implement public pages (only published=true)

- `GET /` landing: intro + latest news + latest blog + subscribe form.
- `GET /blog`: list published articles; language filter optional, default to ES.
- `GET /blog/[slug]`: fetch by slug and published=true; render MD/MDX content from DB.
- `GET /news`: list published news items.
- `GET /news/[slug]`: fetch by slug and published=true; render MD/MDX content from DB.

Use a server-side MDX compile/render helper `lib/mdx.ts`. Wrap rendered content in a simple container (e.g., prose classes OK, but keep minimal).

### Implement subscribe API

- `POST /api/subscribe` body `{ email: string }`
- Validate with Zod at the boundary.
- Upsert Subscriber:
  - If new: create with status ACTIVE
  - If status UNSUBSCRIBED: set ACTIVE and clear unsubscribedAt
  - If already ACTIVE: keep ACTIVE
- Return JSON `{ ok: true }` on success; on validation/db errors return appropriate status + JSON error.

### Implement admin auth (password-only)

- `GET /admin/login` page: simple password form.
- `POST /api/admin/login`: compare submitted password to `ADMIN_PASSWORD`.
- On success: set httpOnly cookie `admin_session` (signed cookie recommended using `SESSION_SECRET`; add env var if missing).
- On failure: return 401 JSON.
- `POST /api/admin/logout`: clear cookie.

Create `lib/auth.ts` with helpers:

- `setSessionCookie` / `clearSessionCookie`
- `verifySessionFromRequest` (reads cookie, verifies signature)
- `requireAdmin` for route handlers (returns 401 if not authed)

Add `middleware.ts`:

- Protect all `/admin/**` except `/admin/login` by redirecting to `/admin/login` when not authed.
- Protect `/api/admin/**` by returning 401 when not authed.

### Implement admin pages (minimal UI)

- `GET /admin` dashboard with links to blog/news/subscribers.

Blog admin:

- list all articles (draft + published)
- new form
- edit form by id

News admin:

- list all news items
- new form
- edit form by id

Subscribers admin:

- list subscribers (email + status)

Keep UI simple: basic tables/lists, textarea editor. Use shadcn/ui only if already standard; otherwise plain components are fine. Avoid extensive styling.

### Implement admin APIs (protected, Zod validated)

Blog:

- `POST /api/admin/blog` create
- `PUT /api/admin/blog/[id]` update
- `POST /api/admin/blog/[id]/publish` toggle publish/unpublish

News:

- `POST /api/admin/news` create
- `PUT /api/admin/news/[id]` update
- `POST /api/admin/news/[id]/publish` toggle publish/unpublish

Subscribers:

- Either `GET /api/admin/subscribers` list, OR fetch directly in server component. Choose simplest consistent with repo; if API exists, protect it.

Use slug for public lookup; id for admin edit/update.

Validate all inputs with Zod in `lib/validators.ts`.

### Implement Prisma singleton

`lib/prisma.ts` as a singleton Prisma client consistent with Next.js dev reload patterns.

### Tests (required)

Add tests aligned with existing test runner:

`POST /api/subscribe`:

- creates ACTIVE when new
- keeps ACTIVE when already ACTIVE
- reactivates when UNSUBSCRIBED (sets ACTIVE, clears unsubscribedAt)

Admin auth:

- login success sets cookie
- invalid password returns 401
- a protected `/api/admin/*` endpoint returns 401 without cookie

Optional: CRUD smoke tests for create/update/publish toggle.

If integration testing Next route handlers is hard with current tooling, create handler-level tests by importing route handler functions and calling them with mocked Request objects.

### Output format (required)

Provide:

A) A concise change summary
B) A file-by-file list of modifications
C) Any new env vars required (e.g., `SESSION_SECRET`) and how they're used
D) Commands to run tests/build
E) Notes about any schema mismatches you had to adapt to (field names, etc.)

### Constraints

- Minimal diffs; no big refactors.
- No advanced styling; simple UI only.
- Server-enforced auth guard (middleware + API guard) is mandatory.
- Do not implement unsubscribe flow, but leave code structure "space" (e.g., TODO/comment) without adding routes.

Proceed now: inspect current repo state, then implement incrementally with tests.
```
