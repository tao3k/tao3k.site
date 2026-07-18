import { createModuleFederationConfig, federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.ORG_ZHIXING_THEME_PORT ?? 4174);
const origin = process.env.ORG_ZHIXING_THEME_ORIGIN ?? `http://127.0.0.1:${port}`;
const basePath = process.env.ORG_ZHIXING_THEME_BASE_PATH ?? "/";
const publicUrl = process.env.ORG_ZHIXING_THEME_PUBLIC_URL ?? new URL(basePath, `${origin}/`).href;

const federationConfig = createModuleFederationConfig({
  name: "tao3k_site",
  filename: "remoteEntry.js",
  manifest: true,
  shareStrategy: "loaded-first",
  dts: false,
  exposes: {
    "./theme": "./src/index.tsx",
  },
  shared: {
    react: { singleton: true },
    "react-dom": { singleton: true },
  },
});

export default defineConfig({
  root,
  base: publicUrl,
  resolve: {
    alias: {
      "@org-zhixing/theme-contract": resolve(
        root,
        "../.data/org-zhixing-theme-contract/src/index.ts",
      ),
    },
  },
  server: {
    port,
    origin,
    cors: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  preview: {
    port,
    cors: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  build: {
    target: "chrome89",
    outDir: "dist",
    emptyOutDir: true,
  },
  plugins: [react(), federation(federationConfig)],
});
