import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/rentme/',          // repo name
  build: { outDir: 'docs' }, // emit build into docs/
})
