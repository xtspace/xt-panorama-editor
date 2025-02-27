import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import fixReactVirtualized from "esbuild-plugin-react-virtualized";
import tsconfigPaths from "vite-tsconfig-paths";


export default defineConfig({
  base: 'https://xtspace.cc:8310/',
  plugins: [
    react(),
    UnoCSS(),
    tsconfigPaths()
  ],
  server: {
    open: true,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://192.168.0.2:8042",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, ""),
      },
      "/file": {
        target: "http://192.168.0.2:8042",
        changeOrigin: true,
      },
    },
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
    esbuildOptions: {
      plugins: [fixReactVirtualized]
    }
  }
})
