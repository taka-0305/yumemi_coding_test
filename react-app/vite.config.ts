import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    host: '0.0.0.0',
    strictPort: true,
    port: 5173
  },
  optimizeDeps: {
    include: ["highcharts", "highcharts-react-official"],
  }
})
