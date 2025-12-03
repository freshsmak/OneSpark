#!/bin/bash
# Quick commit script - removes vercel.json and commits changes

echo "🚀 Preparing deployment commit..."
echo ""

# Show what will be committed
echo "📋 Changes to commit:"
git status --short
echo ""

# Confirm
read -p "Ready to commit? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "✅ Committing changes..."
  git add .
  git commit -m "Remove vercel.json for auto-detection fix - pin Node 18.x"
  
  echo ""
  echo "🚀 Ready to push! Run:"
  echo "   git push"
  echo ""
  echo "Then redeploy in Vercel Dashboard with cache cleared!"
else
  echo "❌ Cancelled"
fi

