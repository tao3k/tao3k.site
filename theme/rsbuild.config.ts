import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const port = Number(process.env.ORG_ZHIXING_THEME_PORT ?? "4174");
const origin = (
  process.env.ORG_ZHIXING_THEME_PUBLIC_URL ??
  process.env.ORG_ZHIXING_THEME_ORIGIN ??
  `http://127.0.0.1:${port}`
).replace(/\/$/, "");
const allowedOrigins = (
  process.env.ORG_ZHIXING_THEME_ALLOWED_ORIGINS ??
  `${origin},http://127.0.0.1:5173,http://localhost:5173`
)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "tao3k_site",
      filename: "remoteEntry.js",
      exposes: {
        "./theme": "./theme/src/index.tsx",
      },
      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
      },
    }),
  ],
  source: {
    entry: {
      index: "./theme/src/preview.tsx",
    },
  },
  tools: {
    rspack: {
      module: {
        rules: [{ resourceQuery: /url/, type: "asset/resource" }],
      },
    },
  },
  html: {
    title: "tao3k.site theme preview",
  },
  output: {
    assetPrefix: `${origin}/`,
    distPath: {
      root: "theme/dist",
    },
  },
  server: {
    cors: {
      origin: allowedOrigins,
    },
    host: "127.0.0.1",
    port,
    strictPort: true,
  },
});
