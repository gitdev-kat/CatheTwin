# 🚀 Step 11 Deployment Checklist

## Pre-Deployment ✅

- [x] **Build Test Passed**
  - ✅ `pnpm build` completed successfully
  - ✅ No TypeScript errors
  - ✅ All routes compiled
  - ✅ 10 routes ready for deployment

- [ ] **Git Repository**
  - [ ] All changes committed
  - [ ] Pushed to GitHub
  - [ ] .env.local NOT in repository (in .gitignore)

## Environment Variables 📝

Copy these from your `.env.local`:

```bash
UPSTASH_VECTOR_REST_URL="your_upstash_vector_url_here"
UPSTASH_VECTOR_REST_TOKEN="your_upstash_token_here"
GROQ_API_KEY="your_groq_api_key_here"
ADMIN_API_KEY="your_admin_api_key_here"
```

## Vercel Deployment Steps

### Step 1: GitHub Push ✅
```powershell
# Check git status
git status

# Add all changes
git add .

# Commit
git commit -m "Ready for Vercel deployment - Step 11 complete"

# Push to GitHub
git push origin main
```

### Step 2: Vercel Setup 🌐
- [ ] Go to https://vercel.com
- [ ] Sign up/in with GitHub
- [ ] Click "Add New..." → "Project"
- [ ] Import your DigitalTwin repository

### Step 3: Configure Project ⚙️
**Framework:** Next.js (auto-detected)

**Root Directory:**
- Option 1: `./` (if deploying from root)
- Option 2: `./digital-twin-workshop/digital-twin-new` (if using full repo)

**Build Settings:**
- Build Command: `pnpm build`
- Output Directory: `.next`
- Install Command: `pnpm install`

### Step 4: Add Environment Variables 🔐

Add these in Vercel project settings:

| Variable | Value | Environments |
|----------|-------|--------------|
| UPSTASH_VECTOR_REST_URL | `https://definite-man-52332-us1-vector.upstash.io` | ✅ Prod ✅ Preview ✅ Dev |
| UPSTASH_VECTOR_REST_TOKEN | `ABYFMGRl...` | ✅ Prod ✅ Preview ✅ Dev |
| GROQ_API_KEY | `your_groq_api_key_here` | ✅ Prod ✅ Preview ✅ Dev |
| ADMIN_API_KEY | `secure-admin-key-123456` | ✅ Prod ✅ Preview ✅ Dev |

### Step 5: Deploy! 🚀
- [ ] Click "Deploy" button
- [ ] Wait 2-4 minutes for build
- [ ] Get your live URL: `https://your-project.vercel.app`

## Post-Deployment Testing ✅

### Test 1: Homepage
```
Visit: https://your-project.vercel.app
Expected: Digital Twin homepage loads
```

### Test 2: CatheTwin Chat
```
Visit: https://your-project.vercel.app/chat
Expected: Chat interface loads and works
```

### Test 3: MCP Endpoint
```powershell
$body = @{jsonrpc="2.0"; method="ping"; id=1} | ConvertTo-Json
Invoke-RestMethod -Uri "https://your-project.vercel.app/api/mcp" -Method POST -Body $body -ContentType "application/json"
```
Expected: JSON-RPC response

### Test 4: Chat API
```powershell
$body = @{message="Hello"; history=@()} | ConvertTo-Json
Invoke-RestMethod -Uri "https://your-project.vercel.app/api/chat" -Method POST -Body $body -ContentType "application/json"
```
Expected: AI response from CatheTwin

### Test 5: Health Check
```
Visit: https://your-project.vercel.app/api/health
Expected: {"status":"healthy"}
```

## Update Integrations 🔄

### Claude Desktop
Update `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "cathetwin-production": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://your-project.vercel.app/api/mcp"]
    }
  }
}
```

### VS Code
Update `.vscode/mcp.json`:
```json
{
  "servers": {
    "cathetwin-production": {
      "type": "http",
      "url": "https://your-project.vercel.app/api/mcp"
    }
  }
}
```

## Success Criteria ✨

- [ ] Vercel deployment shows "Ready"
- [ ] Homepage accessible globally
- [ ] Chat interface works
- [ ] MCP endpoint responds
- [ ] All API routes functional
- [ ] Claude Desktop connects
- [ ] No errors in Vercel logs

## Your Live URLs 🌐

Once deployed, you'll have:

```
Homepage:     https://your-project.vercel.app
Chat:         https://your-project.vercel.app/chat
MCP:          https://your-project.vercel.app/api/mcp
Health:       https://your-project.vercel.app/api/health
```

## Troubleshooting 🔧

### Build Fails
- Check Vercel build logs
- Verify all dependencies in package.json
- Ensure TypeScript compiles locally

### Environment Variables Not Working
- Verify all 4 variables added
- Check spelling matches exactly
- Redeploy after adding variables

### 404 Errors
- Check Root Directory setting
- Verify routes exist in build output
- Check Vercel deployment logs

## Need Help?

📖 Full instructions: `STEP11_INSTRUCTIONS.md`
🆘 Troubleshooting: `CHAT_TROUBLESHOOTING.md`

---

**Ready to Deploy? Follow the steps above!** 🚀

**Made with 💜 by Catherine Dalafu**
