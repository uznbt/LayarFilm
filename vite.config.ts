import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["plyr-react"],
  },
  build: {
    commonjsOptions: {
      include: [/plyr-react/, /node_modules/],
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
})
