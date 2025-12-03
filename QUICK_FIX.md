# Quick Fix for Vercel Build Error

## The Issue

Vercel is throwing: "Function Runtimes must have a valid version" because the `builds` array format is conflicting with modern Vercel auto-detection.

## Immediate Fix

I've simplified `vercel.json` to remove the problematic `builds` array. Vercel will now auto-detect your serverless function from the `api/` directory.

### What Changed:

1. **Removed `builds` array** - Modern Vercel auto-detects functions
2. **Removed `version: 2`** - Not needed
3. **Changed `routes` to `rewrites`** - Modern format
4. **Removed explicit `runtime`** - Uses Node.js from `package.json` engines

### New Configuration:

The `vercel.json` now only contains:
- Build settings
- Rewrites for routing
- Function settings (just maxDuration)
- Security headers

## Next Steps:

1. **Commit and push:**
   ```bash
   git add vercel.json
   git commit -m "Fix: Simplify Vercel config - remove builds array"
   git push
   ```

2. **Deploy will automatically trigger** from the push

3. **Should work now!** ✅

The build should succeed because:
- No conflicting `builds` array
- Vercel auto-detects `api/index.ts` as serverless function
- Runtime comes from `package.json` engines (already set to Node 18.x)

