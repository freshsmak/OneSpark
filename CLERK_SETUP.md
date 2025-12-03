# Clerk Authentication Setup Guide

This document outlines the steps to set up Clerk authentication for SparkConnect.

## Overview

SparkConnect has been migrated from Replit Auth to Clerk authentication. Clerk provides a modern, secure authentication solution with built-in user management.

## Prerequisites

1. A Clerk account (sign up at https://clerk.com)
2. Node.js environment with environment variable support

## Setup Steps

### 1. Create a Clerk Application

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Click "Create Application"
3. Choose your preferred sign-in methods (Email, OAuth providers, etc.)
4. Complete the application setup

### 2. Get Your Clerk API Keys

1. In your Clerk Dashboard, navigate to **API Keys**
2. Copy the following keys:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

### 3. Configure Environment Variables

Set the following environment variables:

#### Frontend (Client)
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

#### Backend (Server)
```bash
CLERK_SECRET_KEY=sk_test_...
```

**Note:** For production, use your production keys (they start with `pk_live_` and `sk_live_` respectively).

### 4. Configure Clerk Dashboard Settings

In your Clerk Dashboard, configure the following:

#### Redirect URLs
- **After sign-in**: Your application URL (e.g., `https://yourdomain.com`)
- **After sign-up**: Your application URL
- **Sign-in redirect URL**: `/`
- **Sign-up redirect URL**: `/`

#### Allowed Origins
- Add your frontend domain (e.g., `https://yourdomain.com`)
- For development, add `http://localhost:5000`

### 5. Update Database Schema (Optional)

The user table schema remains compatible with Clerk. Users will be automatically synced to your database when they sign in.

The existing schema supports:
- User ID (from Clerk)
- Email
- First Name
- Last Name
- Profile Image URL

## Authentication Flow

1. **User visits landing page** → Sees "Start Creating" button
2. **User clicks button** → Clerk sign-in modal opens
3. **User signs in/signs up** → Clerk handles authentication
4. **User redirected** → Back to application with session
5. **Backend syncs user** → User data synced to local database automatically

## Key Files

- **Server Authentication**: `server/clerkAuth.ts`
- **Client Setup**: `client/src/App.tsx` (ClerkProvider)
- **Auth Hook**: `client/src/hooks/useAuth.ts`
- **Routes**: `server/routes.ts` (uses Clerk middleware)

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the landing page
3. Click "Start Creating"
4. Sign in with Clerk
5. Verify you're redirected to the home page
6. Verify user data is saved in your database

## Troubleshooting

### "Clerk publishable key is missing"
- Ensure `VITE_CLERK_PUBLISHABLE_KEY` is set in your environment
- Restart your development server after adding the variable

### "Unauthorized" errors
- Verify `CLERK_SECRET_KEY` is set in your server environment
- Check that your Clerk application is active
- Verify redirect URLs are configured correctly in Clerk Dashboard

### User not syncing to database
- Check server logs for sync errors
- Verify database connection is working
- Ensure user table exists in your database

## Migration Notes

The following endpoints have been removed (were part of Replit Auth):
- `/api/login` - Use Clerk's sign-in modal instead
- `/api/callback` - Clerk handles OAuth callbacks
- `/api/logout` - Use Clerk's SignOutButton component

The following files can be removed (but kept for reference):
- `server/replitAuth.ts` - Replaced by `server/clerkAuth.ts`

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Express Integration](https://clerk.com/docs/backend-requests/hosting/express)
- [Clerk React Integration](https://clerk.com/docs/users/sync-data)

