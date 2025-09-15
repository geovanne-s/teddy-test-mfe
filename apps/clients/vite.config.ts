import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "clientsApp",
      filename: "remoteEntry.js",
      exposes: {
        "./ClientsMfe": "./src/ClientsMfe.tsx",
        "./SelectedClientsPage": "./src/pages/SelectedClientsPage.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "react-router-dom",
        "@reduxjs/toolkit",
        "react-redux",
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
  },
  server: {
    port: 5001,
    host: true,
    strictPort: true,
    fs: {
      strict: false,
    },
  },
});
