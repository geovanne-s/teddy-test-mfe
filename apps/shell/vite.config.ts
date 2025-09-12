import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import federation from "@originjs/vite-plugin-federation";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    // federation({
    //   name: "app_shell",
    //   remotes: {
    //     clientesApp: "http://localhost:5001/assets/remoteEntry.js",
    //   },
    //   shared: [
    //     "react",
    //     "react-dom",
    //     "react-router-dom",
    //     "@reduxjs/toolkit",
    //     "react-redux",
    //   ],
    // }),
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
  },
});
