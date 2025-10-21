# CatheTwin Deployment Guide - Vercel

## Quick Deployment Steps

### Method 1: Deploy via Vercel Website (Easiest - Recommended)

#### Step 1: Prepare Your Project
1. Make sure all your code is saved
2. Commit all changes to Git:
   ```powershell
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

#### Step 2: Sign Up / Login to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

#### Step 3: Import Your Project
1. Once logged in, click "Add New..." → "Project"
2. You'll see "Import Git Repository"
3. Find your "CatheTwin" repository in the list
4. Click "Import" next to it

#### Step 4: Configure Project Settings
You'll see a configuration screen:

**Framework Preset**: Should auto-detect "Next.js" ✅

**Root Directory**: Leave as `./` or set to `CatheTwin-Deploy` if needed

**Build and Output Settings**: (Usually auto-detected)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

#### Step 5: Add Environment Variables
Click "Environment Variables" section and add:

| Name | Value |
|------|-------|
| `GROQ_API_KEY` | `your_groq_api_key_here` |
| `NEXT_PUBLIC_APP_URL` | `https://your-app-name.vercel.app` |

⚠️ **Important**: Get your Groq API key from https://console.groq.com

#### Step 6: Deploy!
1. Click "Deploy" button
2. Wait 2-5 minutes for deployment to complete
3. You'll see a success screen with your live URL!

#### Step 7: Test Your Deployment
1. Click "Visit" or copy the URL
2. Test the homepage
3. Navigate to `/chat` and test the chatbot
4. Verify all features work

---

### Method 2: Deploy via Vercel CLI (Alternative)

#### Step 1: Install Vercel CLI
```powershell
npm install -g vercel
```

#### Step 2: Login to Vercel
```powershell
vercel login
```
Follow the prompts to authenticate.

#### Step 3: Navigate to Your Project
```powershell
cd C:\DigitalTwin\CatheTwin-Deploy
```

#### Step 4: Run Deployment Command
```powershell
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? `cathetwin` (or your preferred name)
- In which directory is your code located? `./`
- Want to override settings? **N**

#### Step 5: Add Environment Variables
```powershell
vercel env add GROQ_API_KEY
```
Paste your Groq API key when prompted.

#### Step 6: Deploy to Production
```powershell
vercel --prod
```

---

## Troubleshooting Common Issues

### Issue 1: Build Fails - "Module not found"
**Solution**: Make sure all dependencies are in package.json
```powershell
npm install
```

### Issue 2: API Key Error
**Solution**: 
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add `GROQ_API_KEY` with your actual key
3. Redeploy by going to Deployments → Click "..." → "Redeploy"

### Issue 3: 404 on Routes
**Solution**: Vercel should auto-detect Next.js. If not:
1. Add `vercel.json` (already exists in your project)
2. Make sure it contains proper routing configuration

### Issue 4: Environment Variables Not Working
**Solution**:
1. Check variable names are EXACT (case-sensitive)
2. Redeploy after adding variables
3. Client-side variables must start with `NEXT_PUBLIC_`

### Issue 5: Slow Loading
**Solution**: This is normal for first load (cold start). Subsequent loads will be faster.

---

## Post-Deployment Checklist

After successful deployment:

✅ **Test All Features**:
- [ ] Homepage loads correctly
- [ ] Chat interface is accessible
- [ ] Chatbot responds to messages
- [ ] Greeting ("hi") works
- [ ] Technical questions work
- [ ] Contact information displays
- [ ] All links work (GitHub, LinkedIn, Email)

✅ **Configure Custom Domain** (Optional):
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

✅ **Update Repository**:
- [ ] Update README.md with live URL
- [ ] Add deployment badge to README
- [ ] Commit and push changes

✅ **Share Your Project**:
- [ ] Add URL to your resume
- [ ] Share on LinkedIn
- [ ] Update portfolio
- [ ] Share with instructors

---

## Getting Your Groq API Key

If you don't have a Groq API key yet:

1. Go to https://console.groq.com
2. Sign up / Login
3. Navigate to API Keys section
4. Click "Create API Key"
5. Copy the key (you won't see it again!)
6. Add it to Vercel environment variables

---

## Your Deployment URLs

After deployment, Vercel will give you:

- **Production URL**: `https://cathetwin.vercel.app` (or your custom domain)
- **Preview URLs**: Automatic for each Git branch
- **Deployment Dashboard**: Manage your app at https://vercel.com/dashboard

---

## Continuous Deployment

Vercel automatically deploys when you push to GitHub:

```powershell
# Make changes to your code
git add .
git commit -m "Update chatbot responses"
git push origin main

# Vercel automatically deploys! 🚀
```

You'll get:
- ✅ Automatic builds on every push
- ✅ Preview deployments for PRs
- ✅ Instant rollbacks if needed
- ✅ SSL certificates (HTTPS) automatically

---

## Monitoring Your Deployment

### Check Deployment Status:
1. Go to https://vercel.com/dashboard
2. Click on your project
3. View "Deployments" tab

### Check Logs:
1. Click on a deployment
2. View "Build Logs" for build process
3. View "Function Logs" for API errors

### Check Analytics:
1. Go to Analytics tab
2. View visitor statistics
3. Monitor performance metrics

---

## Updating Your Live Site

To update your live site after deployment:

```powershell
# 1. Make your changes in code
# 2. Test locally
npm run dev

# 3. Commit changes
git add .
git commit -m "Add new feature"

# 4. Push to GitHub
git push origin main

# 5. Vercel auto-deploys!
# Check vercel.com/dashboard for status
```

---

## Need Help?

**Vercel Documentation**: https://vercel.com/docs
**Vercel Support**: https://vercel.com/support
**Next.js Deployment**: https://nextjs.org/docs/deployment

---

## Final Steps After Deployment

1. **Copy your live URL**
2. **Test everything thoroughly**
3. **Share with your instructor/advisor**
4. **Add to your resume and LinkedIn**
5. **Celebrate! 🎉** You've successfully deployed an AI-powered application!

---

## Expected Deployment Time

- **First deployment**: 3-5 minutes
- **Subsequent deployments**: 1-3 minutes
- **Build time**: ~2 minutes
- **Propagation**: Instant after build

---

## Cost

**Vercel Free Tier includes**:
- ✅ Unlimited deployments
- ✅ Custom domains
- ✅ SSL certificates
- ✅ 100GB bandwidth/month
- ✅ Perfect for student projects!

**No credit card required** for the free tier! 💯

---

## Success! 🎉

Once deployed, your CatheTwin will be:
- ✅ Live and accessible 24/7
- ✅ Secured with HTTPS
- ✅ Fast with edge network
- ✅ Automatically backed up
- ✅ Ready to impress recruiters!

**Your live URL will be**: `https://cathetwin-[random-string].vercel.app`

You can customize this to: `https://cathetwin.vercel.app` (if available)

---

Good luck with your deployment! 🚀
