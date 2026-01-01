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
        // Atoms
        './atoms/Input': './src/components/atoms/Input.tsx',
        './atoms/Button': './src/components/Button.tsx',
        './atoms/Label': './src/components/atoms/Label.tsx',

        // Molecules
        './molecules/FormField': './src/components/molecules/FormField.tsx',
        './molecules/ThemeToggle': './src/components/molecules/ThemeToggle.tsx',

        // Legacy components (keep for backward compatibility)
        './Button': './src/components/Button.tsx',
        './UserCard': './src/components/UserCard.tsx',
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