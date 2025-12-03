#!/bin/bash
# Force Vercel to deploy from latest commit

echo "🚀 Triggering new Vercel deployment..."
echo ""

# Check current commit
CURRENT=$(git rev-parse --short HEAD)
echo "Current commit: $CURRENT"
echo ""

# Check what Vercel is building (from error log)
echo "Vercel is building: 54b3112 (OLD - has vercel.json)"
echo "Latest commit: $CURRENT (NEW - fixes applied)"
echo ""

# Create empty commit to trigger new deployment
echo "Creating empty commit to trigger deployment..."
git commit --allow-empty -m "Trigger Vercel deployment - use latest fixes (vercel.json deleted, Node 18.x pinned)"

echo ""
echo "Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done! Vercel will now build from the latest commit with fixes."
echo ""
echo "Check Vercel Dashboard in 1-2 minutes for the new deployment."
echo "It should build from commit: $CURRENT (or newer)"

