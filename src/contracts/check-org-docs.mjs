import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const documentationRoots = ["docs", "content", "theme"];
const ignoredDirectories = new Set(["dist", "node_modules", "src", "tests"]);
const markdownFiles = [];
const orgFiles = [];

for (const directory of documentationRoots) {
  await collect(resolve(root, directory));
}

if (markdownFiles.length > 0) {
  throw new Error(
    `DOCS-E001 durable documentation must be Org; Markdown found: ${markdownFiles.join(", ")}`,
  );
}

for (const file of orgFiles) {
  const source = await readFile(resolve(root, file), "utf8");
  for (const keyword of ["TITLE", "DATE", "AUTHOR", "FILETAGS"]) {
    if (!source.includes(`#+${keyword}:`)) {
      throw new Error(`DOCS-E002 ${file} is missing #+${keyword}`);
    }
  }
  if (!/^\*\s+\S/mu.test(source)) {
    throw new Error(`DOCS-E002 ${file} has no Org heading`);
  }
}

console.log(`org-docs-contract status=ok files=${orgFiles.length} markdown=0`);

async function collect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const path = resolve(directory, entry.name);
    const relativePath = path.slice(root.length + 1);
    if (entry.isDirectory()) {
      await collect(path);
    } else if (entry.name.endsWith(".md")) {
      markdownFiles.push(relativePath);
    } else if (entry.name.endsWith(".org")) {
      orgFiles.push(relativePath);
    }
  }
}
