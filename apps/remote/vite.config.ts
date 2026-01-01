import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote_app',
      filename: 'remoteEntry.js',
      // Expose Atomic Design components
      exposes: {
        './KanbanBoard': './src/features/kanban/KanbanBoard.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3001,
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    port: 5001,
  },
})