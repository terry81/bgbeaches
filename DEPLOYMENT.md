# GitHub Pages Deployment Setup

## Files Created

1. `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
2. `README.md` - Project documentation with deployment instructions

## Configuration Steps

### 1. Push to GitHub

First, commit and push all changes to your repository:

```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

**Note**: If your default branch is named `master` instead of `main`, update line 6 in `.github/workflows/deploy.yml` accordingly.

### 2. Enable GitHub Pages

1. Go to: https://github.com/terry81/bgbeaches
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions" (not "Deploy from a branch")
5. That's it! No need to click Save - it auto-saves.

### 3. First Deployment

After pushing your code and enabling GitHub Pages:

1. Go to the **Actions** tab in your repository
2. You should see the "Deploy to GitHub Pages" workflow running
3. Click on it to watch the progress
4. Once complete (green checkmark), your site is live!

### 4. Access Your Site

Your site will be available at:
- **GitHub Pages URL**: https://terry81.github.io/bgbeaches/

If you have a custom domain configured (bgbeaches.com), the CNAME file will ensure it works correctly.

## Automatic Updates

From now on, every time you push to the `main` branch:
1. GitHub Actions automatically triggers
2. Builds your Eleventy site
3. Deploys to GitHub Pages
4. Your live site updates in ~1-2 minutes

## Manual Deployment

You can also trigger deployment manually:
1. Go to **Actions** tab
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select branch and click "Run workflow"

## Troubleshooting

If deployment fails:

1. Check the Actions tab for error messages
2. Common issues:
   - Workflow permissions not set correctly
   - Node modules installation failed
   - Build errors in Eleventy

## Custom Domain (Optional)

To use bgbeaches.com instead of terry81.github.io/bgbeaches:

1. In your DNS provider (where you registered bgbeaches.com):
   - Add CNAME record: `www` → `terry81.github.io`
   - OR for apex domain: Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

2. In GitHub Pages settings:
   - Enter "bgbeaches.com" in Custom domain field
   - Wait for DNS check to pass
   - Enable "Enforce HTTPS"

The CNAME file in your repository root is already configured for this.

