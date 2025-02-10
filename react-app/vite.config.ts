import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import env from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [react(),env({ prefix: "VITE", mountedPath: "process.env" }) ],
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
  },
})
