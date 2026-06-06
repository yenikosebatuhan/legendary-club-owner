import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// In production we deploy to GitHub Pages at /legendary-club-owner/, so the
// build needs that base path. Dev/preview/Playwright stay on '/'.
// Override the deploy path with VITE_BASE if you host it elsewhere.
const PAGES_BASE = process.env.VITE_BASE || '/legendary-club-owner/'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? PAGES_BASE : '/',
  server: {
    port: 5173,
    open: true,
  },
}))
