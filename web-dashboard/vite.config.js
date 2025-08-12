// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// If you’re on Tailwind v4, the import is 'tailwindcss/vite' (not '@tailwindcss/vite')
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwind()],
})
