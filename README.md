# Bulgarian Beaches

A comprehensive guide to beaches in Bulgaria, featuring photos and information about coastal locations.

## 🚀 Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch.

### Initial GitHub Setup

To enable automatic deployment, follow these steps:

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment workflow"
   git push origin main
   ```

2. **Configure GitHub Pages**:
   - Go to your repository on GitHub: https://github.com/terry81/bgbeaches
   - Click on **Settings** → **Pages** (in the left sidebar)
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **Verify Deployment**:
   - After pushing changes, go to the **Actions** tab in your repository
   - You should see the "Deploy to GitHub Pages" workflow running
   - Once completed, your site will be available at: https://terry81.github.io/bgbeaches/

### Custom Domain (Optional)

If you want to use a custom domain (bgbeaches.com):

1. In your DNS provider settings, add a CNAME record:
   - Name: `www` (or `@` for apex domain)
   - Value: `terry81.github.io`

2. In GitHub repository settings → Pages:
   - Enter your custom domain in the "Custom domain" field
   - Enable "Enforce HTTPS" after DNS propagates

The `CNAME` file in the repository root already contains your domain configuration.

## 🛠 Local Development

### Prerequisites

- Node.js (version 20 or higher)
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
npm run serve
```

This will start a local development server at http://localhost:8080 with hot reload enabled.

### Build

```bash
npm run build
```

This generates the static site in the `_site` directory.

## 📁 Project Structure

- `src/` - Source files and templates
  - `_data/` - Data files for site generation
  - `_includes/` - Reusable template components
  - `albums/` - Beach photo albums
- `css/` - Stylesheets
- `_site/` - Generated static site (git-ignored)
- `.eleventy.js` - Eleventy configuration

## 🌐 Technologies

- [Eleventy (11ty)](https://www.11ty.dev/) - Static site generator
- Nunjucks - Template engine
- GitHub Pages - Hosting
- GitHub Actions - CI/CD

## 📝 License

ISC

