import { copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve(".output/public");

await copyFile(resolve(outputDirectory, "index.html"), resolve(outputDirectory, "404.html"));

console.log("tao3k-static-pages status=ok fallback=.output/public/404.html");
