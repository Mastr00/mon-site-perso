<h1 align="center">mmsa.app</h1>

<p align="center">
  <strong>Personal portfolio and project dashboard of Mehdi Mamdouh.</strong><br/>
  Built with Next.js, TypeScript, Tailwind CSS, Auth0, and Supabase.
</p>

<p align="center">
  <a href="https://github.com/Mastr00/mon-site-perso/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/Mastr00/mon-site-perso/actions/workflows/ci.yml/badge.svg?branch=main"></a>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15-black?logo=next.js">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-3-38bdf8?logo=tailwindcss&logoColor=white">
  <img alt="Auth0" src="https://img.shields.io/badge/Auth0-2-eb5424?logo=auth0&logoColor=white">
  <img alt="Supabase" src="https://img.shields.io/badge/Supabase-2-3ecf8e?logo=supabase&logoColor=white">
  <img alt="Deploy" src="https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel">
</p>

<p align="center">
  <a href="https://mmsa.app"><strong>Live site →</strong></a>
</p>

---

## Overview

`mmsa.app` is a production-grade personal portfolio with a private content-management dashboard. Visitors browse projects, CV, and contact pages; the owner authenticates via Auth0 and manages portfolio entries — including image uploads — through a protected admin UI backed by Supabase.

The project doubles as a reference for a modern, secure, end-to-end TypeScript stack: SSR/SSG data fetching, OIDC authentication, row-level secure storage, edge-friendly image handling, and full CI/CD.

## Features

- **Public site** — Home, Portfolio, individual Project pages (SSG with ISR), CV, Contact, fully responsive, dark-mode native, internationalised (FR/EN).
- **Admin dashboard** — Auth0-gated CRUD over portfolio projects, image upload to Supabase Storage, GitHub activity widget.
- **SEO** — Per-route metadata, OpenGraph image generation (`@vercel/og`), automatic `sitemap.xml` and `robots.txt` via `next-sitemap`.
- **Hardened security** — Strict security headers, server-side authorisation checks, rate-limited upload endpoint, environment-isolated secrets.
- **Observability** — Vercel Analytics and Speed Insights integrated.
- **Quality gates** — ESLint, Prettier, Husky + lint-staged pre-commit hooks, Vitest unit tests, GitHub Actions CI on every push and pull request.

## Tech stack

| Layer            | Technology                                                                 |
| ---------------- | -------------------------------------------------------------------------- |
| Framework        | [Next.js 15](https://nextjs.org/) (Pages Router), [React 18](https://react.dev/) |
| Language         | [TypeScript 5](https://www.typescriptlang.org/)                            |
| Styling          | [Tailwind CSS 3](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/) |
| UI primitives    | [Lucide Icons](https://lucide.dev/), [react-parallax-tilt](https://github.com/mkosir/react-parallax-tilt) |
| Authentication   | [Auth0](https://auth0.com/) (`@auth0/nextjs-auth0` v2, OIDC)               |
| Database         | [Supabase](https://supabase.com/) (Postgres + Storage + RLS)               |
| Forms            | [Formspree](https://formspree.io/)                                         |
| OG images        | [`@vercel/og`](https://vercel.com/docs/functions/og-image-generation)      |
| SEO              | [`next-sitemap`](https://github.com/iamvishnusankar/next-sitemap)          |
| Testing          | [Vitest 4](https://vitest.dev/)                                            |
| Linting / Format | [ESLint 8](https://eslint.org/), [Prettier 3](https://prettier.io/)        |
| Git hooks        | [Husky 9](https://typicode.github.io/husky/) + [lint-staged](https://github.com/lint-staged/lint-staged) |
| CI / CD          | [GitHub Actions](https://github.com/features/actions), [Vercel](https://vercel.com/) |
| Analytics        | [Vercel Analytics](https://vercel.com/analytics), [Speed Insights](https://vercel.com/docs/speed-insights) |

## Architecture

```
mon-site-perso/
├── pages/                  # Next.js Pages Router (routes)
│   ├── api/                # Serverless API routes
│   │   ├── auth/           # Auth0 [...auth0] handler
│   │   ├── projects/       # CRUD endpoints, owner-only writes
│   │   └── upload-image.ts # Rate-limited image upload to Supabase
│   ├── projects/[id].tsx   # Project detail (SSG + ISR)
│   ├── portfolio.tsx
│   ├── dashboard.tsx       # Auth0-protected admin UI (GSSP)
│   └── ...                 # index, cv, contact, 404, 500
├── components/             # Reusable UI components
├── lib/                    # Server-side utilities
│   ├── supabase.ts         # Typed client + row mappers
│   ├── github.ts           # Cached GitHub user fetch (5 min in-memory)
│   ├── rateLimit.ts        # In-memory token bucket
│   └── apiAuth.ts          # API authorisation helper
├── context/                # React contexts (Language, Theme)
├── public/                 # Static assets
├── styles/                 # Global CSS
└── .github/workflows/ci.yml
```

### Request flow

```
Visitor  ──►  Vercel Edge  ──►  Next.js (SSG / SSR / API)
                                     │
                                     ├─►  Auth0 (OIDC, /api/auth/*)
                                     └─►  Supabase (Postgres + Storage)
```

## Getting started

### Prerequisites

- **Node.js 20+** (Node 24 recommended — matches CI)
- **npm 10+**
- An **Auth0** tenant (free tier sufficient)
- A **Supabase** project (free tier sufficient)

### Installation

```bash
git clone https://github.com/Mastr00/mon-site-perso.git
cd mon-site-perso
npm install
```

### Environment variables

Copy the template and fill in real values:

```bash
cp .env.example .env.local
```

| Variable                          | Scope    | Description                                           |
| --------------------------------- | -------- | ----------------------------------------------------- |
| `AUTH0_SECRET`                    | server   | 32-byte hex (`openssl rand -hex 32`)                  |
| `AUTH0_BASE_URL`                  | server   | `http://localhost:3000` in dev, your domain in prod   |
| `AUTH0_ISSUER_BASE_URL`           | server   | `https://YOUR_TENANT.<region>.auth0.com`              |
| `AUTH0_CLIENT_ID`                 | server   | From Auth0 application settings                       |
| `AUTH0_CLIENT_SECRET`             | server   | From Auth0 application settings                       |
| `NEXT_PUBLIC_SUPABASE_URL`        | client   | Supabase project URL                                  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | client   | Supabase anon key (RLS-restricted)                    |
| `SUPABASE_SERVICE_ROLE_KEY`       | **server only** — bypasses RLS, never expose client-side |
| `ADMIN_EMAIL`                     | server   | Email allowed to perform write operations              |

> `.env.local` is git-ignored. Production values live in Vercel → Project Settings → Environment Variables.

### Run locally

```bash
npm run dev          # http://localhost:3000
```

## Available scripts

| Command                | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| `npm run dev`          | Start the development server with hot reload               |
| `npm run build`        | Production build (also generates the sitemap)              |
| `npm start`            | Serve the production build locally                         |
| `npm run lint`         | Run ESLint                                                 |
| `npm run format`       | Format the codebase with Prettier                          |
| `npm run format:check` | Verify formatting without writing changes                  |
| `npm test`             | Run the Vitest unit-test suite                             |
| `npm run test:watch`   | Run Vitest in watch mode                                   |

## Testing

Unit tests live next to the code they exercise (`*.test.ts`). The suite covers the Supabase row-mapping round-trip and the rate-limiter token-bucket logic.

```bash
npm test
```

CI runs the full pipeline (lint, type-check, tests, build) on every push and pull request to `main`.

## Deployment

The project is continuously deployed to **Vercel**.

1. Import the repository on [vercel.com/new](https://vercel.com/new).
2. Add every variable from `.env.example` under **Project Settings → Environment Variables**.
3. Update `AUTH0_BASE_URL` to the production domain (e.g. `https://mmsa.app`).
4. In your Auth0 application, add the production URL to **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins**.

Each push to `main` triggers a Vercel preview / production deploy. Pull requests get isolated preview URLs.

## Security

- HTTP security headers configured in `next.config.js` (CSP-friendly, HSTS, frame-ancestors).
- Dashboard and write APIs are double-gated: Auth0 session **and** server-side email allow-list.
- The image upload endpoint is rate-limited (in-memory token bucket — swap for Upstash or Redis in horizontal deployments).
- Service-role Supabase key is restricted to server runtime; the client uses the anon key with RLS.
- No secrets are committed; `.env.example` documents the surface without exposing values.
- Husky + lint-staged ensure no unformatted or unlinted code lands in commits.

## License

This project is the personal portfolio of Mehdi Mamdouh. The source is published for reference and transparency; please don't redeploy it as-is under your own name.

## Contact

**Mehdi Mamdouh** — [mmsa.app](https://mmsa.app) — [GitHub @Mastr00](https://github.com/Mastr00)
