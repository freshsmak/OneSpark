# Vercel Deployment Guide for SparkConnect

This guide will help you deploy SparkConnect to Vercel with your own custom domain.

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. A GitHub, GitLab, or Bitbucket account (for Git integration)
3. Your Clerk API keys (already configured)
4. Your PostgreSQL database connection string
5. Your Anthropic API key (for AI features)

## Step 1: Prepare Your Repository

1. **Push your code to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - ready for Vercel deployment"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

## Step 2: Configure Environment Variables

Before deploying, gather all your environment variables:

- `VITE_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key
- `CLERK_SECRET_KEY` - Your Clerk secret key
- `DATABASE_URL` - Your PostgreSQL connection string
- `ANTHROPIC_API_KEY` - Your Anthropic API key (for AI features)
- `NEXT_PUBLIC_APP_URL` - Your domain URL (e.g., `https://yourdomain.com`)

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your Git repository
3. Vercel will auto-detect your project settings
4. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add each variable from Step 2
   - Make sure to add them for all environments (Production, Preview, Development)
5. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
4. **Add Environment Variables**:
   ```bash
   vercel env add VITE_CLERK_PUBLISHABLE_KEY
   vercel env add CLERK_SECRET_KEY
   vercel env add DATABASE_URL
   vercel env add ANTHROPIC_API_KEY
   vercel env add NEXT_PUBLIC_APP_URL
   ```

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

## Step 4: Configure Custom Domain

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `yourdomain.com`)
   - Follow Vercel's DNS configuration instructions

2. **Update DNS Records** (at your domain registrar):
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or add A records as instructed by Vercel

3. **Wait for DNS Propagation** (can take up to 48 hours, usually faster)

## Step 5: Update Clerk Configuration

After your domain is live:

1. **Go to Clerk Dashboard** → Your Application → Paths
2. **Update Redirect URLs**:
   - After sign-in: `https://yourdomain.com`
   - After sign-up: `https://yourdomain.com`
3. **Add Allowed Origins**:
   - Add `https://yourdomain.com`
   - Add your Vercel deployment URL (e.g., `https://your-app.vercel.app`)

## Step 6: Verify Deployment

1. Visit your deployed URL
2. Test the sign-in flow
3. Test creating a spark
4. Verify database connections

## Project Structure for Vercel

- **API Routes**: Handled by `/api/index.ts` (Express app as serverless function)
- **Static Files**: Served from `dist/public` after build
- **Build Output**: `dist/` directory
- **Configuration**: `vercel.json`

## Build Process

Vercel will automatically:
1. Run `npm install`
2. Run `npm run build` (builds both client and server)
3. Deploy the built application

## Troubleshooting

### Build Errors

- **Check Node.js version**: Vercel uses Node.js 20.x by default (specified in `package.json` if needed)
- **Check build logs**: Go to Deployments → Click on a deployment → View logs

### Environment Variables

- **Not working in production?**: Make sure you added them for "Production" environment
- **Frontend variables**: Must start with `VITE_` to be exposed to the browser

### API Routes Not Working

- **Check vercel.json**: Ensure API routes are configured correctly
- **Check function timeout**: Default is 10 seconds, can be increased in `vercel.json`

### Database Connection Issues

- **Connection string format**: Should be PostgreSQL connection string
- **SSL mode**: May need `?sslmode=require` for production databases

## Local Development

To test locally before deploying:

1. **Create `.env` file** (use `.env.example` as template):
   ```bash
   cp .env.example .env
   ```

2. **Fill in your environment variables**

3. **Run locally**:
   ```bash
   npm run dev
   ```

## Continuous Deployment

Once connected to Git:
- **Every push to `main`** → Deploys to production
- **Every pull request** → Creates a preview deployment
- **No manual deployment needed!**

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support
- **Project Issues**: Check your repository's issue tracker

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Custom domain added and DNS configured
- [ ] Clerk redirect URLs updated
- [ ] Database connection tested
- [ ] Sign-in/sign-up flow tested
- [ ] Spark generation tested
- [ ] Database queries working
- [ ] AI features working (if using Anthropic)

