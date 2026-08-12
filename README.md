# Portfolio 2025

Personal portfolio website for **Shivananda Sai**, built with Next.js, TypeScript, Tailwind CSS, and MDX.

Live site: [shiv-2025.vercel.app](https://shiv-2025.vercel.app/)

## Features

- Home page with intro, GitHub contribution calendar, work experience, skills, featured projects, and links
- Projects page powered by a typed project catalog in `src/lib/projects.ts`
- Writings section powered by local MDX files and metadata utilities in `src/lib/writings.ts`
- Keyboard-friendly navigation and post search
- Dynamic Open Graph image routes for home/pages and writings
- Visitor counter in the navbar
  - Tracks unique visitor sessions from the browser
  - Uses Upstash Redis in production
  - Falls back to an in-memory store when Redis credentials are not configured

## Stack

- Next.js 15
- React 19 RC
- TypeScript
- Tailwind CSS 4
- MDX via `next-mdx-remote`
- Motion
- Upstash Redis
- Vercel

## Getting Started

```bash
bun install
bun dev
```

Open `http://localhost:3000`.

## Environment Variables

The visitor counter supports Redis-backed persistence with Upstash:

```env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Without these values, the app still runs locally with an in-memory visitor store.

## Scripts

```bash
bun dev     # start development server with Turbopack
bun build   # build for production
bun start   # start production server
bun lint    # run ESLint
```

## Project Structure

```txt
src/app              routes, layouts, metadata, API routes
src/components       UI components
src/lib              site data, writings, projects, visitors, utilities
```

## Screenshot

<img width="1661" height="2530" alt="portfolio screenshot" src="https://github.com/user-attachments/assets/fb94f795-ecfd-4fab-8f89-d6e9e654d19e" />
