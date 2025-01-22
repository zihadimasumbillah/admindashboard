import { defineConfig} from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
    plugins: [react()],
    build: {
      outDir: 'dist',
      sourcemap: true
    },
    define: {
      'import.meta.env.VITE_USE_MOCK_DATA': JSON.stringify(true)
    }
})
