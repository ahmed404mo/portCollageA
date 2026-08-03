<p align="center">
  <img src="public/Ahmed.png" width="120" alt="Ahmed Portfolio Logo" />
</p>

<h1 align="center">Ahmed — Student Portfolio</h1>

<p align="center">
  A modern, animated <strong>student portfolio & CMS</strong> for an Early Childhood Education student — combining education and creativity through technology.
  <br />
  Public portfolio pages + password-protected admin dashboard · Prisma + Neon PostgreSQL · Cloudinary media.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-v5-3178c6?logo=typescript&logoColor=white" />
  <img alt="Prisma" src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" />
  <img alt="PostgreSQL" src="https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="shadcn/ui" src="https://img.shields.io/badge/shadcn%2Fui-radix--ui-000000?logo=shadcnui&logoColor=white" />
  <img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-Media-3448C5?logo=cloudinary&logoColor=white" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Data Model](#data-model)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Routes](#routes)
- [API Routes](#api-routes)
- [Security](#security)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

**Ahmed — Student Portfolio** is a two-in-one web app:

1. **Public portfolio** — an animated landing site with hero, live stats, an infinite tech-logo marquee, project showcase, skills, certificates and a working contact form.
2. **Admin CMS** — a password-protected dashboard to manage the entire site content (profile, about, projects, skills, credentials) and read incoming contact messages — no code changes needed to update the portfolio.

Everything is **content-driven**: public pages fetch their data from a REST API backed by **Prisma + Neon PostgreSQL**, and the admin edits the same data through full CRUD interfaces with **Cloudinary** image uploads.

---

## Features

### Public Portfolio 🌐
- **Home** — hero with profile data, downloadable resume, animated marquee of tech icons, live stats (projects, certificates, skills)
- **About** — story section with experience & location (editable)
- **Projects** — grid of projects (image, tags, GitHub & live links) + a detailed `/projects/[id]` page
- **Skills** — skills grouped by category with proficiency levels
- **Credentials** — certificates with issuer/date info and a **lightbox** to zoom certificate images
- **Contact** — validated form that saves messages straight into the database
- **Particles & animations** — animated particle background, Framer Motion transitions, dark theme

### Admin CMS 🛠️
- **Login** — email/password authentication issuing a signed **JWT** (24h, httpOnly cookie)
- **Projects CRUD** — create / edit / delete portfolio projects with Cloudinary image upload
- **Skills CRUD** — manage categories & levels
- **Credentials CRUD** — manage certificates and certificate images
- **About & Profile** — edit the single-record content sections
- **Messages** — inbox of all contact-form submissions

### UX & Polish ✨
- **Framer Motion** animations, hover effects, modal forms with validation
- **Toasts** (react-hot-toast) for all actions
- **Recharts** for admin charts/visualizations
- Responsive, mobile-friendly, dark-first design

---

## Architecture

```
                         ┌────────────────────────────────────────────┐
 Visitor (public) ──────►│  Next.js 16 (App Router)                  │
                         │  ├── / · /about · /projects · /skills      │
                         │  ├── /credentials · /contact              │
                         │  └── client-side fetch → REST API          │
 Admin ─────────────────►│  /login → /admin/*                        │
                         │  ├── middleware.ts (JWT cookie guard)      │
                         │  └── CRUD admin pages + Cloudinary uploads │
                         └───────────────┬────────────────────────────┘
                                         │ Prisma (PrismaClient)
                                         ▼
                                   PostgreSQL (Neon)
                                         │
                              ┌──────────┴───────────┐
                              ▼                      ▼
                       Cloudinary (images)      JWT auth (jose)
```

### Auth flow
- `POST /api/auth/login` validates email/password (bcrypt) → signs a **JWT (HS256, 24h)** → stored in an `httpOnly` cookie
- `middleware.ts` redirects unauthenticated visitors away from `/admin/*` and logged-in admins away from `/login`

---

## Tech Stack

| Layer        | Technology                                              |
|--------------|---------------------------------------------------------|
| Framework    | Next.js 16 (App Router), React 19, TypeScript           |
| Styling      | Tailwind CSS v4 + shadcn/ui (Radix UI, lucide icons)    |
| Database     | PostgreSQL + Prisma 6 (`@prisma/adapter-neon`)          |
| Auth         | JWT (`jose`, HS256) + bcryptjs (httpOnly cookies)       |
| Media        | Cloudinary (`next-cloudinary` upload widgets)           |
| Charts       | Recharts                                               |
| Forms        | React Hook Form + Zod                                   |
| Toasts       | react-hot-toast · sonner                               |
| Animations   | Framer Motion                                          |
| Theming      | next-themes                                            |

---

## Project Structure

```text
app/
├── page.tsx                      # Home — hero, stats, tech marquee
├── about/page.tsx                # About section
├── projects/
│   ├── page.tsx                  # Projects grid
│   └── [id]/page.tsx             # Project details
├── skills/page.tsx               # Skills by category
├── credentials/page.tsx          # Certificates + lightbox
├── contact/page.tsx              # Contact form → messages
├── login/page.tsx                # Admin login
├── admin/                        # Admin CMS (protected by middleware)
│   ├── layout.tsx                # Sidebar layout
│   ├── profile/page.tsx          # Profile editor
│   ├── about/page.tsx            # About editor
│   ├── projects/page.tsx         # Projects CRUD
│   ├── skills/page.tsx           # Skills CRUD
│   ├── credentials/page.tsx      # Credentials CRUD
│   └── messages/page.tsx         # Inbox
├── api/
│   ├── auth/login/route.ts       # POST — admin login (JWT)
│   ├── profile/route.ts          # GET/POST
│   ├── about/route.ts            # GET/POST
│   ├── projects/route.ts         # GET/POST/PUT/DELETE
│   ├── skills/route.ts           # GET/POST/PUT/DELETE
│   ├── credentials/route.ts      # GET/POST/PUT/DELETE
│   ├── messages/route.ts         # GET/POST
│   ├── stats/route.ts            # GET — counts for hero stats
│   └── setup/route.ts            # GET — bootstraps the admin account
├── data/weeksData.js             # Training-weeks content (editable)
├── layout.tsx / globals.css      # Root layout & global styles

components/                       # navigation, footer, particles, animated-elements, theme-provider
lib/                              # prisma.ts, db.ts, utils.ts
prisma/
├── schema.prisma                 # Data model
└── migrations/                   # SQL migrations
middleware.ts                     # JWT cookie route protection
```

---

## Data Model

> Full definition in `prisma/schema.prisma` (PostgreSQL).

| Model | Purpose |
|---|---|
| `Profile` | Single-record header/home data (name, headline, bio, avatar, resume, GitHub/LinkedIn, email) |
| `About` | Single-record "about" section (title, description, experience, location, image) |
| `Credential` | Certificate (title, issuer, date, description, image, link) |
| `Project` | Portfolio project (title, description, image, tags, GitHub & live links) |
| `Skill` | Skill entry (category, name, level `0–100`) |
| `Message` | Contact-form submission (name, email, subject, message) |
| `Admin` | Admin account (unique email + hashed password) |

---

## Getting Started

### Prerequisites

- **Node.js** >= 18 (or Bun)
- **PostgreSQL** (local or hosted — e.g. Neon, Supabase, RDS)
- A **Cloudinary** account with an unsigned upload preset

### Installation

```bash
# 1. Clone & install
git clone https://github.com/ahmed404mo/portCollageA.git
cd portCollageA
npm install

# 2. Configure environment (see below) — copy .env.example to .env.local

# 3. Generate Prisma client & create the schema
npx prisma generate
npx prisma db push          # or `npx prisma migrate dev`

# 4. Create the admin account
#    Open http://localhost:3000/api/setup once, then log in at /login
```

---

## Environment Variables

| Variable                            | Description                                        |
|-------------------------------------|----------------------------------------------------|
| `DATABASE_URL`                      | PostgreSQL connection string (Prisma/Neon)         |
| `JWT_SECRET`                        | Secret used to sign the admin login JWT            |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Cloudinary unsigned upload preset name          |

> ⚠️ Never commit real secrets. `.gitignore` already excludes `.env*` files.

---

## Running the App

```bash
# Development
npm run dev          # → http://localhost:3000

# Production
npm run build
npm start

# Lint
npm run lint
```

---

## Routes

### Public

| Route | Description |
|---|---|
| `/` | Home — hero, stats, tech marquee |
| `/about` | About section |
| `/projects` | Projects grid |
| `/projects/[id]` | Project details |
| `/skills` | Skills by category |
| `/credentials` | Certificates + lightbox |
| `/contact` | Contact form |
| `/login` | Admin login |

### Admin (protected)

| Route | Description |
|---|---|
| `/admin/profile` | Profile editor |
| `/admin/about` | About editor |
| `/admin/projects` | Projects CRUD |
| `/admin/skills` | Skills CRUD |
| `/admin/credentials` | Credentials CRUD |
| `/admin/messages` | Inbox |

---

## API Routes

| Route | Methods | Description |
|---|---|---|
| `/api/auth/login` | `POST` | Admin login → issues JWT cookie |
| `/api/profile` | `GET/POST` | Profile content |
| `/api/about` | `GET/POST` | About content |
| `/api/projects` | `GET/POST/PUT/DELETE` | Projects CRUD |
| `/api/skills` | `GET/POST/PUT/DELETE` | Skills CRUD |
| `/api/credentials` | `GET/POST/PUT/DELETE` | Credentials CRUD |
| `/api/messages` | `GET/POST` | Inbox + contact submissions |
| `/api/stats` | `GET` | Counts for hero stats |
| `/api/setup` | `GET` | Bootstraps the admin account |

---

## Security

- **bcrypt** hashed admin passwords (10 rounds)
- **JWT authentication** (HS256 via `jose`) stored in an `httpOnly`, `secure`, `SameSite=Strict` cookie (24h)
- **Route protection** via `middleware.ts` for `/admin/*`
- **Environment variables** for all sensitive configuration

---

## Deployment

The project is ready for **Vercel**:

1. Push to GitHub and import the repo in [Vercel](https://vercel.com/new) (auto-detects Next.js).
2. Set `DATABASE_URL`, `JWT_SECRET` and `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` in the dashboard.
3. Point `DATABASE_URL` at a hosted PostgreSQL (Neon) and run `npx prisma migrate deploy` before the first deploy.

---

## License

All rights reserved.
