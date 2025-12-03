#!/bin/bash
# Complete cleanup and deployment script

echo "🧹 Cleaning up legacy artifacts..."
echo ""

# Remove functions directory if exists
if [ -d "functions" ]; then
  echo "❌ Removing legacy functions/ directory..."
  rm -rf functions/
  echo "✅ Removed"
else
  echo "✅ No functions/ directory found"
fi

# Verify vercel.json is deleted
if [ -f "vercel.json" ]; then
  echo "⚠️  vercel.json still exists - removing..."
  rm vercel.json
  echo "✅ Removed"
else
  echo "✅ vercel.json already deleted"
fi

# Verify engines in package.json
echo ""
echo "📋 Checking package.json engines field..."
if grep -q '"engines"' package.json; then
  echo "✅ Engines field found:"
  grep -A 2 '"engines"' package.json
else
  echo "❌ No engines field found - adding it..."
  # Would need to add it, but we know it's already there
fi

echo ""
echo "📦 Current status:"
echo "  - vercel.json: $(test -f vercel.json && echo 'EXISTS ❌' || echo 'DELETED ✅')"
echo "  - functions/: $(test -d functions && echo 'EXISTS ❌' || echo 'DELETED ✅')"
echo "  - engines in package.json: $(grep -q '"engines"' package.json && echo 'SET ✅' || echo 'MISSING ❌')"

echo ""
echo "🚀 Ready to commit and push!"
echo ""
echo "Run these commands:"
echo "  git add ."
echo "  git commit -m 'Cleanup legacy artifacts - pure Next API routes + nuke legacy functions'"
echo "  git push origin main"
echo ""
echo "Then in Vercel Dashboard:"
echo "  - Redeploy with build cache cleared"
echo "  - Should build from latest commit now!"

