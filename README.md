# arnml-site

Personal website and newsletter built with Next.js 16, PostgreSQL, and Prisma.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [pnpm](https://pnpm.io/) 9+
- [PostgreSQL](https://www.postgresql.org/) database (local or hosted, e.g. [Neon](https://neon.tech/))

## Setup

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/<your-user>/arnml-site.git
cd arnml-site
pnpm install
```

2. Create a `.env` file in the project root. Use `.env.example` as a guide:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/arnml
SESSION_SECRET=at-least-32-characters-long-secret-here
ADMIN_PASSWORD=your-admin-password
NODE_ENV=development
```

3. Set up the database and generate the Prisma client:

```bash
pnpm prisma migrate dev
```

4. Start the dev server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site. Admin panel is at `/admin` (login with your `ADMIN_PASSWORD`).

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run tests |
| `pnpm prisma studio` | Browse database in the browser |
