import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// `base: './'` keeps asset paths relative so the build works on
// Vercel, Netlify and GitHub Pages (project subpaths) without changes.
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5173,
    open: true,
  },
})
