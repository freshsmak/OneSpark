# OneSpark - AI Product Ideation Engine

A Next.js 14 application that generates consumer product concepts from real pain points using AI.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - From Clerk dashboard
- `CLERK_SECRET_KEY` - From Clerk dashboard
- `NEXT_PUBLIC_SUPABASE_URL` - From Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - From Supabase project settings
- `SUPABASE_SERVICE_ROLE_KEY` - From Supabase project settings (for server-side operations)

### 3. Set Up Clerk Authentication

1. Create a Clerk account at https://clerk.com
2. Create a new application
3. Copy your publishable key and secret key to `.env.local`
4. Configure sign-in/sign-up URLs in Clerk dashboard:
   - Sign-in URL: `/sign-in`
   - Sign-up URL: `/sign-up`
   - After sign-in: `/sparks`
   - After sign-up: `/sparks`

### 4. Set Up Supabase

1. Create a Supabase project at https://supabase.com
2. Copy your project URL and anon key to `.env.local`
3. Copy your service role key to `.env.local`
4. Run the migration:

```bash
# Using Supabase CLI
supabase db push

# Or manually run the SQL in supabase/migrations/001_create_sparks_table.sql
# in your Supabase SQL editor
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
onespark/
├── src/
│   ├── app/
│   │   ├── (dashboard)/        # Protected routes
│   │   │   └── sparks/         # Main spark generation page
│   │   ├── api/
│   │   │   └── sparks/         # API routes for saving/fetching sparks
│   │   ├── layout.tsx          # Root layout with Clerk provider
│   │   ├── page.tsx            # Landing page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   └── ui/                 # Reusable UI components
│   └── lib/
│       ├── spark-engine.ts     # Spark generation logic
│       ├── spark-data.ts       # Product categories, pain points, etc.
│       ├── db.ts               # Supabase client setup
│       └── utils.ts            # Utility functions
├── supabase/
│   └── migrations/            # Database migrations
└── middleware.ts               # Clerk middleware for route protection
```

## Features

- **Spark Generation**: Click "Generate Spark" to create a new product concept
- **Clerk Authentication**: Secure user authentication
- **Supabase Storage**: All sparks are saved to your Supabase database
- **Real Pain Points**: Concepts are generated from actual consumer complaints
- **Category-Based**: Generates concepts across 50+ product categories

## Next Steps

- Add AI-powered generation using Claude API
- Create `/saved` page to view all saved sparks
- Add remix functionality
- Add roadmap generation
- Integrate Stripe for premium features

