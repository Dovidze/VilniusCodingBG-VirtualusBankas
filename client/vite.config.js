import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Proxy serverio pajungimas
  // BUTINAI ISITIKINKITE AR JŪSŲ SERVERIS VEIKIA TAME PAČIAME 3000 PORTE
  server: {
    proxy: {
      '/api' : {
        target: 'http://localhost:3000'
      }
    }
  }
})
