# Add `topic` and `language` to `Subscriber` (local + prod)

This project uses Prisma with PostgreSQL, and the `Language` enum already exists (`ES`, `EN`, `PT`).

This runbook is split into:
- local development DB (using your local `.env` `DATABASE_URL`)
- production DB (migrated by `.github/workflows/migrate-prod.yml` on push to `main`)

Recommended approach: add columns as non-breaking first, backfill, then enforce constraints.

## 1) Update Prisma schema (local code change)

Edit `prisma/schema.prisma` in `model Subscriber` and add:

```prisma
topic    String?
language Language?
```

Use nullable fields first for a safe rollout.

## 2) Local: ensure `.env` points to development DB

Make sure your local `.env` has:

```env
DATABASE_URL=postgresql://...your-dev-db...
```

Quick check:

```bash
echo $DATABASE_URL
```

## 3) Local: create migration (without applying yet)

```bash
npx prisma migrate dev --name add_subscriber_topic_language --create-only
```

If your project uses pnpm scripts for Prisma, you can use:

```bash
pnpm prisma migrate dev --name add_subscriber_topic_language --create-only
```

## 4) Edit generated SQL migration

Open the generated `prisma/migrations/*_add_subscriber_topic_language/migration.sql` and use:

```sql
-- Add columns as nullable first (safe for existing rows)
ALTER TABLE "Subscriber"
ADD COLUMN "topic" TEXT,
ADD COLUMN "language" "Language";

-- Backfill existing rows
UPDATE "Subscriber"
SET "topic" = COALESCE("topic", 'general'),
    "language" = COALESCE("language", 'ES');

-- Optional: enforce NOT NULL after backfill
ALTER TABLE "Subscriber"
ALTER COLUMN "topic" SET NOT NULL,
ALTER COLUMN "language" SET NOT NULL;

-- Optional: defaults for future inserts
ALTER TABLE "Subscriber"
ALTER COLUMN "topic" SET DEFAULT 'general',
ALTER COLUMN "language" SET DEFAULT 'ES';

-- Optional but recommended index if filtering/sending by topic+language
CREATE INDEX IF NOT EXISTS "Subscriber_topic_language_idx"
ON "Subscriber"("topic", "language");
```

## 5) Local: apply migration to development DB

```bash
npx prisma migrate dev
```

Or with pnpm:

```bash
pnpm prisma migrate dev
```

## 6) Local: regenerate Prisma client

```bash
npx prisma generate
```

Or with pnpm:

```bash
pnpm prisma generate
```

## 7) Push migration files to `main` (this triggers prod migration workflow)

```bash
git add prisma/schema.prisma prisma/migrations
git commit -m "Add topic and language to subscriber"
git push origin main
```

## 8) Production: migration is applied by GitHub Actions

Current workflow in `.github/workflows/migrate-prod.yml`:
- runs on push to `main`
- uses production `DATABASE_URL` from GitHub `secrets.DATABASE_URL`
- runs `pnpm prisma migrate deploy`

So production deploy command is **not** run locally; it is executed in CI.

Equivalent CI step:

```bash
pnpm prisma migrate deploy
```

## 9) Quick verification

### Local development DB

```bash
npx prisma studio
```

### SQL check (run on local dev DB or prod DB)

```sql
SELECT "email", "topic", "language", "status"
FROM "Subscriber"
ORDER BY "createdAt" DESC
LIMIT 20;
```

