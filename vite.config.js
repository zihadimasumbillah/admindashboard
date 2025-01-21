import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import process from 'process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    define: {
      // Vite env variables
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || '/api'),
      'import.meta.env.VITE_USE_MOCK_DATA': JSON.stringify(env.VITE_USE_MOCK_DATA === 'true'),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
      open: true
    }
  }
})
