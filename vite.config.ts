import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 3000,
  },
  css: {
    transformer: "lightningcss",
    lightningcss: {
      drafts: {
        customMedia: true,
      },
    },
  },
  plugins: [tanstackStart(), viteReact()],
});
