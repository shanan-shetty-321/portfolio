# Shanan Shetty — Portfolio

A fast, single-page portfolio for **Shanan Shetty** (AI/ML Engineer).
Built with **Vite + React + TypeScript**, deployed on **GitHub Pages**.

- Sticky left profile panel (dark-gold) with a live constellation animation
- Rotating role, scroll-spy nav, always-visible contact
- Sections: About · Experience · Projects · Skills · Contact
- Project demos play as lightweight looping videos (no GIF bloat)
- Contact form delivers straight to my inbox via Web3Forms (no backend)

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

All personal content lives in [`src/content.ts`](src/content.ts).

Deploys automatically on push to `main` via GitHub Actions (`.github/workflows/deploy.yml`).
