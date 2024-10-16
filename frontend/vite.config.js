import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // Proxy API requests to the backend server
      '/backend': {
        target: 'http://localhost:3000', // Replace with your backend URL
        secure: false,
      },
    },
  },
  plugins: [react()],
})
