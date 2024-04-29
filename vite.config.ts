import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import UnoCSS from 'unocss/vite'


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
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@mock": resolve(__dirname, "src/mock"),
      "@types": resolve(__dirname, "src/types"),
      "@pages": resolve(__dirname, "src/pages"),
      "@assets": resolve(__dirname, "src/assets"),
      "@components": resolve(__dirname, "src/components"),
      "@utils": resolve(__dirname, "src/utils"),
      "@layout": resolve(__dirname, "src/layout"),
      "@enum": resolve(__dirname, "src/enum"),
      "@generator": resolve(__dirname, "src/generator")
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
          assetFileNames: "static/[ext]/[name].[ext]",
          manualChunks:(id)=>{
            if(id.includes("generator")){
              return "generator-worker"
            }
          }
        }
      ]
    }
  }
})
