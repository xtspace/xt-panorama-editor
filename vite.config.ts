import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import fixReactVirtualized from "esbuild-plugin-react-virtualized";


export default defineConfig({
  base: 'https://xtspace.cc:8310/',
  plugins: [
    react(),
    UnoCSS()
  ],
  server: {
    open: true,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://hzxtkj.cn:8310/api",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
      "/file": {
        target: "https://hzxtkj.cn:8310/file",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/file/, ""),
      },
    },
  },
  resolve: {
    tsconfigPaths: true
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: '@import (reference) "src/styles/index.less";',
        javascriptEnabled: true
      }
    }
  },
  build: {
    emptyOutDir: false,
    rollupOptions: {
      output: [
        {
          chunkFileNames: "static/js/[name].js",
          entryFileNames: "static/js/[name].js",
          assetFileNames: "static/[ext]/[name].[ext]"
        }
      ]
    }
  },
  optimizeDeps: {
    rolldownOptions: {
      plugins: [fixReactVirtualized]
    }
  }
})
