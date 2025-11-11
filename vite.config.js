import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuración para Vercel y local
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
    open: true,
  },
})
