import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteCommonjs(), tsconfigPaths()],
  server: {
    port: 5001, //for local dev server
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser', //for aws amplify
    },
  },
});

