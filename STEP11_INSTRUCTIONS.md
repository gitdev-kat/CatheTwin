# Step 11: Deploy MCP Server to Vercel

## 🎯 Goal
Deploy your fully tested CatheTwin MCP server to Vercel for reliable, 24/7 access from anywhere.

---

## 📋 Prerequisites Checklist

Before starting deployment, ensure you have:

- ✅ MCP server tested and working locally (http://localhost:3000)
- ✅ CatheTwin chatbot functional
- ✅ Environment variables documented (.env.local)
- ✅ GitHub account
- ✅ All files committed to local git repository

---

## 🚀 Step 1: Pre-Deployment Build Test

**Verify your MCP server builds successfully:**

```powershell
# Navigate to your project
cd c:\DigitalTwin\digital-twin-workshop\digital-twin-new

# Install dependencies (if needed)
pnpm install

# Run the build command
pnpm build
```

**Expected Output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Creating an optimized production build
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         92.1 kB
├ ○ /chat                                8.5 kB         95.4 kB
└ ○ /api/chat                            0 B            0 B
```

**If build fails:**
- Check for TypeScript errors
- Verify all imports are correct
- Fix any linting issues
- Ensure all dependencies are installed

---

## 📦 Step 2: Create GitHub Repository

### 2.1: Initialize Git (if not already done)

```powershell
# Check if git is initialized
git status

# If not initialized, run:
git init
git add .
git commit -m "Initial commit: CatheTwin Digital Twin MCP Server"
```

### 2.2: Create Repository on GitHub

1. Go to https://github.com/new
2. **Repository name:** `DigitalTwin` (or keep your existing name)
3. **Description:** "CatheTwin - AI Digital Twin MCP Server for Interview Preparation"
4. **Visibility:** Public (recommended) or Private
5. Click **"Create repository"**

### 2.3: Push to GitHub

```powershell
# Add GitHub remote (replace gitdev-kat with your username)
git remote add origin https://github.com/gitdev-kat/DigitalTwin.git

# Or if already added, verify:
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main
```

**Verify:**
- Visit your GitHub repository URL
- Confirm all files are uploaded
- Check that .env.local is NOT in the repository (should be in .gitignore)

---

## 🌐 Step 3: Access Vercel Dashboard

### 3.1: Create Vercel Account

1. Go to https://vercel.com
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub repositories
5. Complete your profile setup

### 3.2: Vercel Dashboard Overview

- **Projects:** Your deployed applications
- **Teams:** Personal account (free tier)
- **Import Git Repository:** Main deployment option
- **Add New... → Project:** Start new deployment

---

## 📥 Step 4: Import GitHub Repository

### 4.1: Start Import Process

1. In Vercel Dashboard, click **"Add New..."** → **"Project"**
2. Select **"Import Git Repository"**
3. Choose **"GitHub"** as Git provider
4. Find your **"DigitalTwin"** repository
5. Click **"Import"**

### 4.2: Project Configuration

**Framework Preset:** Next.js (auto-detected) ✅

**Build & Development Settings:**
- **Framework Preset:** Next.js
- **Root Directory:** `./` (or `./digital-twin-workshop/digital-twin-new` if needed)
- **Build Command:** `pnpm build`
- **Output Directory:** `.next`
- **Install Command:** `pnpm install`

**⚠️ IMPORTANT: Don't click "Deploy" yet!**

Scroll down to configure environment variables first.

---

## 🔐 Step 5: Configure Environment Variables

### 5.1: Locate Your Environment Variables

Open your `.env.local` file:

```bash
UPSTASH_VECTOR_REST_URL="https://definite-man-52332-us1-vector.upstash.io"
UPSTASH_VECTOR_REST_TOKEN="ABYFMGRlZmluaXRlLW1hbi01MjMzMi11czFhZG1pblpUVTFaVGxrWWpNdE1ETTRZeTAwT1dJM0xXSTRPR1V0WWprM05ERXhPVGcwT1RjMg=="
   GROQ_API_KEY=your_groq_api_key_here
ADMIN_API_KEY="secure-admin-key-123456"
```

### 5.2: Add Environment Variables in Vercel

In the **"Environment Variables"** section:

**Variable 1:**
- **Key:** `UPSTASH_VECTOR_REST_URL`
- **Value:** `your_upstash_vector_url_here`
- **Environments:** ✅ Production ✅ Preview ✅ Development

**Variable 2:**
- **Key:** `UPSTASH_VECTOR_REST_TOKEN`
- **Value:** `your_upstash_token_here`
- **Environments:** ✅ Production ✅ Preview ✅ Development

**Variable 3:**
- **Key:** `GROQ_API_KEY`
- **Value:** `your_groq_api_key_here`
- **Environments:** ✅ Production ✅ Preview ✅ Development

**Variable 4 (Optional):**
- **Key:** `ADMIN_API_KEY`
- **Value:** `secure-admin-key-123456`
- **Environments:** ✅ Production ✅ Preview ✅ Development

### 5.3: Security Best Practices

✅ **DO:**
- Use Vercel's environment variables for all secrets
- Apply variables to all environments
- Keep .env.local in .gitignore

❌ **DON'T:**
- Commit API keys to GitHub
- Share environment variables publicly
- Use the same keys for development and production (ideally)

---

## 🚀 Step 6: Deploy to Vercel

### 6.1: Start Deployment

1. After configuring all environment variables, click **"Deploy"**
2. Vercel will start the deployment process

### 6.2: Deployment Process

**Phase 1: Cloning (10-30 seconds)**
- Cloning repository from GitHub
- Fetching latest code

**Phase 2: Building (2-4 minutes)**
- Installing dependencies with `pnpm install`
- Building Next.js application with `pnpm build`
- Optimizing production bundle

**Phase 3: Deploying (30-60 seconds)**
- Uploading to global CDN
- Configuring serverless functions
- Activating production domain

### 6.3: Success Indicators

✅ **"Deployment completed successfully"**
✅ Green checkmark next to your project
✅ Live URL provided

**Your URLs:**
- **Production:** `https://your-project-name.vercel.app`
- **MCP Endpoint:** `https://your-project-name.vercel.app/api/mcp`
- **CatheTwin Chat:** `https://your-project-name.vercel.app/chat`

**Example:**
```
https://cathetwin-digital-twin.vercel.app
https://cathetwin-digital-twin.vercel.app/api/mcp
https://cathetwin-digital-twin.vercel.app/chat
```

---

## 🧪 Step 7: Test Live MCP Server

### 7.1: Test MCP Endpoint

**PowerShell Test:**

```powershell
# Test your live MCP endpoint (replace with your actual URL)
$body = @{
    jsonrpc = "2.0"
    method = "ping"
    id = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://your-project-name.vercel.app/api/mcp" -Method POST -Body $body -ContentType "application/json"
```

**Expected Response:**
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "status": "ok",
    "message": "MCP Server is running"
  }
}
```

### 7.2: Test CatheTwin Chat API

```powershell
$body = @{
    message = "Hello, who are you?"
    history = @()
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://your-project-name.vercel.app/api/chat" -Method POST -Body $body -ContentType "application/json"
```

**Expected Response:**
```json
{
  "response": "Hi, I'm Catherine Dalafu, a Full-Stack Developer and IT student at Saint Paul University Philippines..."
}
```

### 7.3: Test in Browser

1. **Visit Homepage:**
   - URL: `https://your-project-name.vercel.app`
   - Should show your Digital Twin home page

2. **Visit CatheTwin Chat:**
   - URL: `https://your-project-name.vercel.app/chat`
   - Should load the chat interface
   - Try asking questions

3. **Check Health Endpoint:**
   - URL: `https://your-project-name.vercel.app/api/health`
   - Should return: `{"status":"healthy"}`

---

## 💬 Step 8: Update Claude Desktop Configuration

### 8.1: Locate Claude Desktop Config

**Windows:**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Mac:**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

### 8.2: Update Configuration

```json
{
  "mcpServers": {
    "cathetwin-production": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://your-project-name.vercel.app/api/mcp"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

**Replace** `your-project-name.vercel.app` with your actual Vercel URL.

### 8.3: Test Claude Desktop

1. **Restart Claude Desktop**
2. **Start a new conversation**
3. **Test MCP server:**

```
Can you tell me about Catherine Dalafu's work experience?
```

**Expected:** Claude should respond with your personalized professional data from your digital twin.

---

## 🔧 Step 9: Update VS Code MCP Configuration

### 9.1: Update .vscode/mcp.json

**Create or update** `c:\DigitalTwin\digital-twin-workshop\digital-twin-new\.vscode\mcp.json`:

```json
{
  "servers": {
    "cathetwin-production": {
      "type": "http",
      "url": "https://your-project-name.vercel.app/api/mcp",
      "timeout": 30000,
      "description": "Production CatheTwin Digital Twin MCP Server"
    }
  }
}
```

### 9.2: Test in VS Code GitHub Copilot

1. Open any file in VS Code
2. Use GitHub Copilot Chat
3. Ask:

```
@workspace Can you tell me about my work experience using the production digital twin MCP server?
```

**Expected:** Copilot should return your personalized data.

---

## ✅ Step 10: Deployment Verification Checklist

### 10.1: Deployment Status

- [ ] Vercel shows "Deployment completed successfully"
- [ ] Live URL is accessible in browser
- [ ] No build errors in Vercel deployment logs
- [ ] No runtime errors in Vercel function logs

### 10.2: MCP Endpoint Testing

- [ ] `/api/mcp` endpoint responds to POST requests
- [ ] Returns valid JSON-RPC 2.0 format responses
- [ ] MCP ping test successful
- [ ] MCP tools/list returns available tools
- [ ] No CORS errors in browser console

### 10.3: Environment Variables

- [ ] All 4 environment variables configured in Vercel
- [ ] Variables applied to Production environment
- [ ] Variables applied to Preview environment
- [ ] Variables applied to Development environment
- [ ] No sensitive data exposed in client-side code

### 10.4: CatheTwin Chat Testing

- [ ] Chat interface loads successfully
- [ ] Can type and send messages
- [ ] AI responses are personalized to Catherine Dalafu
- [ ] All profile data accessible (work, skills, education)
- [ ] No API errors in browser console

### 10.5: Client Integration

- [ ] Claude Desktop connects to production URL
- [ ] Claude Desktop returns personalized responses
- [ ] VS Code GitHub Copilot can access MCP server
- [ ] Digital twin responses are accurate

### 10.6: Performance & Reliability

- [ ] Response times under 5 seconds
- [ ] Upstash Vector database connections working
- [ ] Groq API calls completing successfully
- [ ] No timeout errors
- [ ] Chat interface responsive

---

## 🔄 Step 11: Continuous Deployment Setup

### 11.1: How It Works

**Vercel automatically redeploys when you push to GitHub:**

1. You make changes to your code locally
2. Commit and push to GitHub
3. Vercel detects the changes
4. Automatically builds and deploys
5. Live site updated with zero downtime

### 11.2: Making Updates

```powershell
# 1. Make changes to your code
# Edit digitaltwin.json, update profile, fix bugs, etc.

# 2. Test locally first
pnpm dev
# Visit http://localhost:3000/chat and test

# 3. Commit changes
git add .
git commit -m "Updated Catherine's profile with new project"

# 4. Push to GitHub
git push origin main

# 5. Vercel automatically deploys!
# Check Vercel dashboard for deployment status
```

### 11.3: Monitoring Deployments

**In Vercel Dashboard:**

1. Go to your project
2. Click **"Deployments"** tab
3. View deployment status:
   - ⏳ Building
   - ✅ Ready
   - ❌ Failed

4. Click on any deployment to see:
   - Build logs
   - Function logs
   - Deployment details
   - Preview URL

### 11.4: Best Practices

✅ **Always test locally first:**
```powershell
pnpm dev
# Test thoroughly before pushing
```

✅ **Use descriptive commit messages:**
```powershell
git commit -m "Added new STAR project: Database Migration"
git commit -m "Fixed chat input bug on mobile"
git commit -m "Updated JPCS role to Secretary"
```

✅ **Monitor deployment logs:**
- Check for build errors
- Verify environment variables loaded
- Test API endpoints after deployment

✅ **Keep environments synchronized:**
- Update .env.local locally
- Update Vercel environment variables
- Test in both environments

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ **Build & Deployment:**
- Vercel build completes without errors
- Green checkmark on deployment
- Live URL accessible globally

✅ **MCP Server:**
- `/api/mcp` endpoint responding
- Valid JSON-RPC 2.0 responses
- All MCP tools accessible

✅ **CatheTwin Chat:**
- Web interface loads correctly
- Can send and receive messages
- AI responses are personalized
- Mobile-responsive design working

✅ **Integrations:**
- Claude Desktop connects successfully
- VS Code Copilot can query your data
- Both return accurate, personalized responses

✅ **Performance:**
- Response times under 5 seconds
- No timeout errors
- Database connections stable
- API calls successful

---

## 📞 Troubleshooting

### Build Fails

**Error:** TypeScript errors during build

**Solution:**
```powershell
# Fix TypeScript errors locally
pnpm build

# Check for type errors
npx tsc --noEmit
```

---

### Environment Variables Not Working

**Error:** API returns 401 Unauthorized

**Solution:**
1. Check Vercel Dashboard → Settings → Environment Variables
2. Ensure all variables are set for Production
3. Redeploy after adding variables

---

### MCP Endpoint Returns 404

**Error:** Cannot find /api/mcp

**Solution:**
1. Check Root Directory setting in Vercel
2. If using monorepo, set to `./digital-twin-workshop/digital-twin-new`
3. Verify file exists: `src/app/api/mcp/route.ts`

---

### Chat Not Working

**Error:** Chat interface loads but doesn't respond

**Solution:**
1. Check browser console for errors (F12)
2. Verify environment variables in Vercel
3. Test `/api/chat` endpoint directly:
   ```powershell
   Invoke-RestMethod -Uri "https://your-url.vercel.app/api/chat" -Method POST -Body '{"message":"test"}' -ContentType "application/json"
   ```

---

### Groq API Errors

**Error:** Groq API calls failing

**Solution:**
1. Verify `GROQ_API_KEY` in Vercel environment variables
2. Check Groq API quota/limits
3. Test API key validity

---

## 📚 Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **AI Agents Toolkit:** https://aiagents.ausbizconsulting.com.au/builders-toolkit
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repository:** https://github.com/gitdev-kat/DigitalTwin

---

## 🎊 Congratulations!

You've successfully deployed **CatheTwin** to production! 🚀

Your AI digital twin is now:
- ✅ Available 24/7 from anywhere
- ✅ Accessible via HTTPS
- ✅ Automatically deployed on every update
- ✅ Ready for interview preparation

**Your Live URLs:**
- **CatheTwin Chat:** `https://your-project-name.vercel.app/chat`
- **Homepage:** `https://your-project-name.vercel.app`
- **MCP Endpoint:** `https://your-project-name.vercel.app/api/mcp`

---

**Made with 💜 by Catherine Dalafu**
*Powered by Vercel, Next.js, Groq AI, and Upstash*
