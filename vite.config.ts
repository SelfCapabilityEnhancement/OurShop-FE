import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  let targetURL;
  if (command === 'serve') {
    targetURL = 'http://127.0.0.1:8080';
  } else if (command === 'build') {
    targetURL = 'https://ourshop.azurewebsites.net/api/v1';
  }

  return {
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
        {
          find: 'images',
          replacement: resolve(__dirname, 'src/assets/images'),
        },
      ],
    },
    server: {
      proxy: {
        '/api': {
          target: targetURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
