# ONE SPARK - Product Ideation Engine

## Overview

ONE SPARK is an AI-powered consumer product ideation platform that generates novel product concepts by analyzing real consumer pain points. The application combines a React frontend with an Express backend, leveraging Claude AI (Anthropic) to create innovative product ideas complete with names, taglines, features, and visual cards.

The system operates in two modes:
1. **Pre-generated Mode**: Uses a curated database of product concepts for instant ideation
2. **AI-Powered Mode**: Generates truly unique concepts using Claude AI by combining category selection, pain point analysis, and creative product design

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool

**UI Component System**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling. The design system follows a "Dark Future/Spark Theme" with deep space blue backgrounds and electric accent colors.

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. Authentication state is managed through a custom `useAuth` hook that queries the user endpoint.

**Routing**: wouter for lightweight client-side routing. The app has two main routes:
- Landing page (unauthenticated users)
- Home page (authenticated users with product generation interface)

**Key Features**:
- Animated product cards using Framer Motion with 3D perspective effects
- Confetti celebrations on successful product generation
- History drawer for viewing past generated concepts
- Toggle between AI and pre-generated modes
- Real-time loading states with multi-step progress indicators

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js

**API Design**: RESTful API with the following main endpoints:
- `/api/auth/*` - Authentication endpoints using Replit Auth
- `/api/sparks` - CRUD operations for product concepts

**Authentication**: Replit OpenID Connect (OIDC) authentication with Passport.js strategy. Sessions are stored in PostgreSQL using connect-pg-simple.

**AI Integration**: Anthropic Claude API for product concept generation. The AI service accepts a product category and pain points, then generates structured JSON responses with product details.

**Data Layer**: 
- ORM: Drizzle ORM with PostgreSQL dialect
- Database Client: Neon serverless PostgreSQL with WebSocket support
- Schema: Type-safe schema definitions shared between client and server via `@shared/schema`

**Build Process**: 
- Custom esbuild configuration bundles server code with selective dependency bundling (allowlist approach)
- Client built separately using Vite
- Both outputs combined into `dist/` directory for production deployment

### Data Storage

**Database**: PostgreSQL (Neon serverless)

**Schema Design**:

1. **sessions** table - Express session storage with expiration tracking
2. **users** table - User profiles from Replit Auth (id, email, firstName, lastName, profileImageUrl, timestamps)
3. **sparks** table - Generated product concepts with the following structure:
   - User foreign key with cascade delete
   - Category (e.g., "kitchen gadgets", "pet products")
   - Product concept data (name, tagline, pain solved, description)
   - Features array stored as JSONB
   - Price point and aesthetic vibe
   - Optional image URL
   - Auto-incrementing ID and timestamps

**Migration Strategy**: Drizzle Kit manages schema migrations with files output to `./migrations` directory

### External Dependencies

**AI Services**:
- **Anthropic Claude API**: Primary AI service for product concept generation. Configured via environment variables for API key and optional base URL override. Generates structured product concepts from pain points and categories.

**Authentication**:
- **Replit Auth (OIDC)**: OAuth 2.0 / OpenID Connect provider for user authentication. Configured with issuer URL, client credentials, and session management.

**Database**:
- **Neon PostgreSQL**: Serverless PostgreSQL database accessed via connection string. Supports WebSocket connections for real-time features.

**Development Tools**:
- **Replit-specific Vite plugins**:
  - `@replit/vite-plugin-cartographer` - Code navigation
  - `@replit/vite-plugin-dev-banner` - Development environment indicator
  - `@replit/vite-plugin-runtime-error-modal` - Error overlay
  - Custom `metaImagesPlugin` - Updates OpenGraph meta tags with deployed domain

**Frontend Libraries**:
- **Radix UI**: Complete set of unstyled, accessible UI primitives
- **Framer Motion**: Animation library for micro-interactions
- **canvas-confetti**: Celebration effects
- **TanStack Query**: Server state management
- **wouter**: Minimal routing

**Styling**:
- **Tailwind CSS**: Utility-first CSS with custom theme configuration
- **Custom fonts**: Inter (body) and Space Grotesk (display) from Google Fonts

**Asset Management**: Static assets including pre-generated product concept images stored in `attached_assets/` directory with Vite alias `@assets`