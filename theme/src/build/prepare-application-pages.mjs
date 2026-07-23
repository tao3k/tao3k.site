import { access, copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

import { siteRouteIds } from "../site-routes.ts";

const outputRoot = resolve(process.argv[2] ?? ".pages");
const shellPath = resolve(outputRoot, "index.html");

await access(shellPath);
await Promise.all(
  siteRouteIds.map(async (routeId) => {
    const routeRoot = resolve(outputRoot, routeId);
    await mkdir(routeRoot, { recursive: true });
    await copyFile(shellPath, resolve(routeRoot, "index.html"));
  }),
);
await copyFile(shellPath, resolve(outputRoot, "404.html"));

console.log(`tao3k-application-pages status=ok routes=${siteRouteIds.length} out=${outputRoot}`);
