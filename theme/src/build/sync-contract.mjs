import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "../../..");
const packageJson = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const contract = packageJson.orgZhixing?.contract;

if (contract?.package !== "@org-zhixing/theme-contract") {
  throw new Error("THEME-DOWNSTREAM-E002 package.json does not pin the Zhixing contract package");
}

const files = Object.entries(contract.integrity ?? {});
if (files.length === 0) {
  throw new Error("THEME-DOWNSTREAM-E002 Zhixing contract integrity map is empty");
}

const sourceBase = `https://raw.githubusercontent.com/tao3k/org-zhixing-themes/${contract.revision}/packages/theme-contract`;
const targetRoot = resolve(root, ".data/org-zhixing-theme-contract");
let cacheHits = 0;

for (const [relativePath, expectedDigest] of files) {
  const target = resolve(targetRoot, relativePath);
  const cached = await readFile(target).catch(() => null);
  if (cached !== null && digest(cached) === expectedDigest) {
    cacheHits += 1;
    continue;
  }

  const response = await fetch(`${sourceBase}/${relativePath}`);
  if (!response.ok) {
    throw new Error(
      `THEME-DOWNSTREAM-E002 failed to fetch ${relativePath}: HTTP ${response.status}`,
    );
  }
  const content = Buffer.from(await response.arrayBuffer());
  const actualDigest = digest(content);
  if (actualDigest !== expectedDigest) {
    throw new Error(
      `THEME-DOWNSTREAM-E002 integrity mismatch for ${relativePath}: expected=${expectedDigest} actual=${actualDigest}`,
    );
  }
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, content);
}

console.log(
  `zhixing-theme-contract-sync status=ok revision=${contract.revision} files=${files.length} cacheHits=${cacheHits}`,
);

function digest(content) {
  return createHash("sha256").update(content).digest("hex");
}
