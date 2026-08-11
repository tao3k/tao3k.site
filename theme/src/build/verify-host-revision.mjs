import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export const verifyHostRevision = async ({ packagePath, hostRoot }) => {
  const expected = await readPinnedHostRevision(packagePath);
  let received;
  try {
    received = execFileSync("git", ["-C", resolve(hostRoot), "rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    throw new Error(`TAO3K-LOCAL-E002 Org Zhixing host is not a Git checkout: ${hostRoot}`);
  }

  if (received !== expected) {
    throw new Error(
      `TAO3K-LOCAL-E002 Org Zhixing host revision mismatch: expected ${expected}; received ${received}. ` +
        "Set ORG_ZHIXING_HOST to a checkout at the pinned revision.",
    );
  }

  return Object.freeze({ expected, received });
};

export const readPinnedHostRevision = async (packagePath) => {
  const packageJson = JSON.parse(await readFile(resolve(packagePath), "utf8"));
  const expected = packageJson.orgZhixing?.contract?.revision;
  if (typeof expected !== "string" || !/^[0-9a-f]{40}$/.test(expected)) {
    throw new Error("TAO3K-LOCAL-E002 package.json must pin a full Org Zhixing revision");
  }
  return expected;
};

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const [packagePath, hostRoot] = process.argv.slice(2);
  if (!packagePath || !hostRoot) {
    throw new Error(
      "TAO3K-LOCAL-E002 usage: verify-host-revision.mjs <package.json> <org-zhixing-host>",
    );
  }
  const receipt = await verifyHostRevision({ packagePath, hostRoot });
  console.log(`tao3k-host-revision status=ok revision=${receipt.received}`);
}
