import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server: {
    proxy: {
      '/api': { // 🔹 Any request starting with "/api" will be proxied
        target: 'http://localhost:5000', // 🔹 Your backend URL (Change this accordingly)
        changeOrigin: true,
        secure: false, // 🔹 Set to false if using HTTP instead of HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // 🔹 Removes "/api" prefix when forwarding the request
      },
    }},
})
