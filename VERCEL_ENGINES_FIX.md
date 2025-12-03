# Vercel Runtime Error - Final Fix: Verify Engines in package.json

## Current Status Check

### ✅ Already Configured:
1. **`vercel.json`** - DELETED ✅
2. **`package.json`** - Has `engines: { "node": "18.x" }` ✅

## The Issue

Even with `engines` set, Vercel might not be reading it correctly. Let's verify the format is exactly right.

## Verification Steps

### 1. Verify package.json Format

Check that your `package.json` has the engines field in the correct location (should be at the top level, near version):

```json
{
  "name": "rest-express",
  "version": "1.0.0",
  "engines": {
    "node": "18.x"
  },
  ...
}
```

**Current status:** ✅ Already present at lines 6-8

### 2. Make Sure It's Pushed to Git

The engines field must be in the committed version:

```bash
git diff package.json
```

If there are uncommitted changes, commit them:
```bash
git add package.json
git commit -m "Ensure Node 18.x engines field is committed"
git push
```

### 3. Force Vercel to Re-read Configuration

After pushing, **clear build cache** in Vercel:
- Dashboard → Deployments → Redeploy → Uncheck "Use existing Build Cache"

## If Still Failing

### Alternative: Add to Root AND onespark

If you have both root and onespark folders, ensure engines is in both:

**Root `package.json`:** ✅ Already has it
**onespark/package.json:** Currently empty - may need engines too

### Verify Vercel Project Settings

In Vercel Dashboard → Settings → General:
- **Node.js Version**: Should show "Auto" or "18.x"
- **Framework Preset**: Should detect correctly

## Final Checklist

- [ ] `vercel.json` deleted ✅
- [ ] `package.json` has `engines: { "node": "18.x" }` ✅
- [ ] Changes committed to git
- [ ] Build cache cleared in Vercel
- [ ] Redeployed with fresh build

## The Command Sequence

```bash
# 1. Verify engines is in package.json
cat package.json | grep -A 2 engines

# 2. Commit if needed
git add package.json
git commit -m "Pin Node 18.x runtime for Vercel"
git push

# 3. Then in Vercel Dashboard:
# - Go to Deployments
# - Redeploy
# - UNCHECK "Use existing Build Cache"
# - Deploy
```

## Expected Result

After this:
- ✅ Build should show "Runtime: nodejs18.x"
- ✅ No "Function Runtimes must have a valid version" error
- ✅ Build completes successfully

If it still fails, the issue might be with how the Express app is exported in `api/index.ts`. But try this first - 95% of cases resolve with proper engines field + cache clear.

