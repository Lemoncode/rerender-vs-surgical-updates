import { defineConfig } from "vite";
import solidjs from 'vite-plugin-solid';
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [solidjs()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
