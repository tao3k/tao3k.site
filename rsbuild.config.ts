import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/rspack";

const normalizeBasePath = (value: string): string => {
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
};

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const defaultBasePath =
  process.env.GITHUB_ACTIONS === "true" && repositoryName ? `/${repositoryName}/` : "/";
const basePath = normalizeBasePath(process.env.TAO3K_SITE_BASE_PATH ?? defaultBasePath);

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      __TAO3K_BASE_PATH__: JSON.stringify(basePath),
    },
    entry: {
      index: "./src/index.tsx",
    },
  },
  tools: {
    rspack: {
      module: {
        rules: [{ resourceQuery: /url/, type: "asset/resource" }],
      },
      plugins: [
        tanstackRouter({
          target: "react",
          autoCodeSplitting: true,
        }),
      ],
    },
  },
  html: {
    title: "tao3k",
  },
  output: {
    assetPrefix: basePath,
    distPath: {
      root: ".output/public",
    },
  },
  server: {
    base: basePath,
    historyApiFallback: true,
  },
});
