# Anonymous Life Game Web

A weekend MVP skeleton for a one-person web service.

The first goal is deliberately small:

> Record one choice. Keep it as history. Do not judge it yet.

## Concept

**日記は歴史 / Every diary becomes history**

This repository is the web-service experiment layer for `anonymous-life-game`.
It is not a social network, not a community, and not a billing product yet.

## Stack

- Next.js
- Supabase
- Cloudflare Pages
- GitHub

## MVP Features

- Input today's choice
- Save it to Supabase
- Show recent choice history
- Keep the service simple enough for one-person operation

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

Create the database table using:

```text
db/schema.sql
```

Apply it in the Supabase SQL Editor.

## Repository structure

```text
app/                  Next.js app
app/page.tsx          MVP UI
db/schema.sql         Supabase schema and prototype RLS policies
docs/operations.md    Operating guide for the weekend MVP
.env.example          Required environment variables
```

## Operating policy

This project intentionally avoids high-operational-cost features:

- No user-to-user communication
- No comments
- No public profiles
- No payments
- No ads in the first prototype

The first success condition is not revenue.
The first success condition is proving that a one-person web service can exist with minimal operational burden.

## Production warning

The initial Supabase policy allows anonymous reads and inserts for prototype use.
Before public release, replace it with authenticated Row Level Security.
