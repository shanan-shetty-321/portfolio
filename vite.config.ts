import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' => relative asset paths, works on GitHub Pages project sites
// regardless of the repo name (single-page app, no client-side routing).
export default defineConfig({
  base: './',
  plugins: [react()],
})
