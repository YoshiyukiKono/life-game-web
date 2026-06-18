# Operations Guide

## Purpose

This repository is not yet a production service. It is a private prototype for validating whether a one-person web service can be built with managed infrastructure.

## Weekly operating principle

- Keep the service private or semi-private until the concept is stable.
- Do not add billing, user-to-user communication, comments, or public profiles in the MVP.
- Prefer managed services over self-hosted infrastructure.
- Treat every operational task as a cost to personal attention.

## Initial setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Apply `db/schema.sql`.
4. Copy `.env.example` to `.env.local`.
5. Fill in Supabase URL and anon key.
6. Run locally.

```bash
npm install
npm run dev
```

## Cloudflare Pages deployment

1. Push this repository to GitHub.
2. Create a Cloudflare Pages project.
3. Connect the GitHub repository.
4. Set build command:

```bash
npm run build
```

5. Set environment variables:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## MVP completion criteria

- A choice can be entered.
- The choice is saved to Supabase.
- Recent choices are listed.
- The service is deployable from GitHub to Cloudflare Pages.

## Do not add yet

- Authentication
- Payments
- Ads
- Comments
- Public sharing
- AI generation
- Mobile app packaging

These are intentionally postponed.
