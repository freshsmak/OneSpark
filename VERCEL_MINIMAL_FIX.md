# Minimal Vercel Configuration Fix

## Problem

The error "Function Runtimes must have a valid version" suggests Vercel is having trouble parsing the function configuration. This often happens when there are conflicting or outdated configurations.

## Solution: Minimal Configuration

I've simplified `vercel.json` to the absolute minimum needed:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## What Was Removed

1. ❌ **`functions` block** - Let Vercel auto-detect all function settings
2. ❌ **`headers` block** - Can be added back later if needed
3. ❌ **`builds` array** - Already removed
4. ❌ **`runtime` specifications** - Uses Node.js from `package.json` engines

## Why This Works

- **Auto-detection**: Vercel automatically detects `api/index.ts` as a serverless function
- **Runtime**: Uses Node.js 18.x from `package.json` engines field
- **Simpler = Better**: Less configuration = fewer parsing errors
- **Modern Vercel**: Uses current Vercel auto-detection features

## Next Steps

1. **Commit and push:**
   ```bash
   git add vercel.json
   git commit -m "Minimal Vercel config - let auto-detection handle everything"
   git push
   ```

2. **Redeploy** - The push will trigger a new deployment

3. **Should work now!** The minimal config removes all potential parsing conflicts.

## If You Need Function Settings Later

You can add them back after deployment works:
```json
"functions": {
  "api/index.ts": {
    "maxDuration": 30
  }
}
```

But try without them first - auto-detection usually works great!

