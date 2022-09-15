import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';
import eslintPlugin from '@nabla/vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/A-Photo-Tagging-App/',
  plugins: [eslintPlugin(), react()],
  server: { hmr: { overlay: false } },
});
