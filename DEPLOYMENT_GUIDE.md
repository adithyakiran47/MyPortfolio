# Step-by-Step Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com if you don't have one)
- Git installed on your computer
- Your portfolio code ready

## Step 1: Verify Your Project Structure

Your project should have this structure:
```
Portfolio/
├── index.html          (main HTML file in root)
├── vercel.json         (Vercel configuration)
├── .gitignore          (Git ignore file)
└── src/
    ├── styles/
    │   └── main.css
    ├── scripts/
    │   └── main.js
    └── assets/
        └── images/
            └── adithya-kiran.JPG
```

## Step 2: Initialize Git Repository (if not already done)

Open terminal/command prompt in your project folder and run:

```bash
git init
git add .
git commit -m "Initial commit - Portfolio website"
```

## Step 3: Push to GitHub

### 3.1 Create a New Repository on GitHub
1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it (e.g., "portfolio" or "my-portfolio")
5. **Do NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### 3.2 Connect Your Local Repository to GitHub
Copy the commands GitHub shows you, or use these (replace YOUR_USERNAME and YOUR_REPO_NAME):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel

### 4.1 Sign In to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Log In"
3. Sign in with your GitHub account (recommended for easy integration)

### 4.2 Create New Project
1. Click "Add New..." button
2. Select "Project"
3. You'll see a list of your GitHub repositories
4. Find and click on your portfolio repository
5. Click "Import"

### 4.3 Configure Project Settings
**IMPORTANT:** Configure these settings:

1. **Project Name**: Keep default or change to your preference
2. **Framework Preset**: Select **"Other"** or leave as "Other" (auto-detected)
3. **Root Directory**: Leave **empty** (this means root directory, which is correct)
4. **Build Command**: Leave **empty** (no build needed for static site)
5. **Output Directory**: Leave **empty**
6. **Install Command**: Leave **empty**

### 4.4 Deploy
1. Click "Deploy" button
2. Wait for deployment to complete (usually 1-2 minutes)
3. You'll see a success message with your live URL

## Step 5: Verify Deployment

1. Click on your deployment URL
2. Check that:
   - ✅ Website loads correctly
   - ✅ Styles are applied (CSS loads)
   - ✅ Navigation works
   - ✅ Image displays correctly
   - ✅ JavaScript works (particle animation, mobile menu)

## Step 6: Custom Domain (Optional)

If you want to use a custom domain:
1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Issue: 404 Error or Blank Page
- **Solution**: Check that `index.html` is in the root directory
- Verify `vercel.json` exists and is configured correctly

### Issue: CSS/JS/Images Not Loading
- **Solution**: Check browser console for 404 errors
- Verify file paths in `index.html` are correct (should start with `src/`)
- Ensure all files are committed to GitHub

### Issue: Build Fails
- **Solution**: 
  - Make sure Root Directory is **empty** in Vercel settings
  - Ensure Build Command is **empty**
  - Check that `vercel.json` doesn't have invalid configuration

### Issue: Image Not Showing
- **Solution**: Check image filename case (should be `adithya-kiran.JPG` with uppercase JPG)
- Verify image exists in `src/assets/images/` directory

## Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- Deploy when you push to the `main` branch
- Create preview deployments for pull requests
- Update production when you merge to main

## Next Steps

After successful deployment:
1. Your site is live! Share the URL
2. Make changes locally
3. Commit and push to GitHub
4. Vercel automatically redeploys

## Need Help?

- Check Vercel deployment logs in the dashboard
- Check browser console for errors
- Verify all files are in the correct locations
- Ensure GitHub repository is up to date

