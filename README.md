# Obaidullah Arshad — Full Stack Developer Portfolio

![status-live](https://img.shields.io/badge/status-live-brightgreen) ![license-MIT](https://img.shields.io/badge/license-MIT-blue) ![astro](https://img.shields.io/badge/built%20with-astro-blueviolet)

A modern, responsive portfolio website showcasing full-stack development work. Built with **Astro**, featuring a liquid/glassmorphic design, smooth animations, and scroll-triggered reveals.

## Features

- **Liquid Theme**: Glassmorphic panels, smooth gradients, and soft shadows.
- **Responsive Design**: Mobile-first layout, optimized for all screen sizes.
- **Smooth Animations**: Scroll-triggered reveals, parallax effects, and micro-interactions.
- **Dynamic Effects**: Mouse-tracking pointer glow, scroll progress bar, and ambient background glow.
- **Fast & Lightweight**: Built with Astro for instant page loads and optimal performance.
- **SEO-Friendly**: Static generation, semantic HTML, and accessibility best practices.

---

## Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: Tailwind CSS + custom CSS variables
- **JavaScript**: Vanilla JS for animations and interactions
- **Deployment**: Ready for Vercel, Netlify, or GitHub Pages

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development

1. Clone the repository:
   ```bash
   git clone https://github.com/obaidullah/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   - **Windows PowerShell Users**: If you see "running scripts is disabled", use:
     ```powershell
     npm.cmd run dev
     ```
     Or allow script execution once:
     ```powershell
     Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
     ```

4. Open http://localhost:4323/ and start editing!

---

## Customization

### Update Your Info
Edit `src/config.ts` to personalize your portfolio:
```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Title",
  description: "Your bio",
  accentColor: "#7c3aed", // Purple
  social: {
    email: "your@email.com",
    github: "your-github-username",
    linkedin: "your-linkedin",
    twitter: "",
  },
  // Add your projects, experience, education, and skills
};
```

### Update Your Photo
Replace `public/obaid.jpeg` with your own photo (same filename or update the `Hero.astro` component).

### Customize Colors
Modify CSS variables in `src/styles/global.css`:
```css
:root {
  --color-primary: #7c3aed;   /* Purple */
  --color-accent: #06b6d4;    /* Cyan */
  /* ... other variables ... */
}
```

---

## Build & Deploy

### Production Build
```bash
npm run build
```
The output will be in the `dist/` directory, ready for deployment.

### Deploy to Vercel (Recommended)
Vercel has first-class Astro support with zero-config deployments:

1. Push your code to GitHub.
2. Visit [vercel.com](https://vercel.com) and sign in with GitHub.
3. Click "Add New" → "Project" → select your portfolio repo.
4. Vercel will auto-detect Astro and deploy. Done! Your site is live.
5. Every push to `main` auto-deploys.

**Bonus**: Free SSL, custom domain support, and analytics.

### Deploy to Netlify
1. Push your code to GitHub.
2. Visit [netlify.com](https://netlify.com) and connect your GitHub account.
3. Create a new site from Git, select your repo.
4. Set build command: `npm run build` and publish folder: `dist`.
5. Click "Deploy" and your site goes live in seconds.

### Deploy to GitHub Pages
1. Update `astro.config.mjs` if using a non-root domain:
   ```javascript
   export default defineConfig({
     site: 'https://yourusername.github.io',
   });
   ```
2. Build and deploy:
   ```bash
   npm run build
   ```
3. Push `dist/` to the `gh-pages` branch or enable GitHub Pages in repo settings.

---

## Project Structure

Essential files for Git:

```
.
├── src/
│   ├── config.ts              # Your portfolio data (name, projects, experience, skills)
│   ├── components/            # Astro components (Header, Hero, About, Projects, etc.)
│   ├── pages/
│   │   └── index.astro        # Home page
│   └── styles/
│       └── global.css         # Theme variables and animations
├── public/
│   └── obaid.jpeg             # Your profile photo
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── astro.config.mjs           # Astro config
└── README.md                  # This file
```

**What to upload to Git:**
- `src/` — your components and config
- `public/` — your photo and assets
- `package.json`, `package-lock.json`
- `tsconfig.json`, `astro.config.mjs`
- `README.md`
- `.gitignore` (standard Node.js)

**What to NOT upload (add to `.gitignore`):**
- `node_modules/` — dependencies (npm install will restore)
- `dist/` — build output (regenerated on deploy)
- `.env` — if you add sensitive data
- `node_modules/`, `.DS_Store`, `*.log`

---

## License

MIT — Feel free to use, modify, and distribute.
