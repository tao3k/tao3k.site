import { execFileSync } from "node:child_process";
import { access, mkdir, readFile, symlink } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { readPinnedHostRevision, verifyHostRevision } from "./verify-host-revision.mjs";

export const prepareLocalHost = async ({
  cacheRoot,
  hostOverride = "",
  packagePath,
  sourceRoot,
}) => {
  if (hostOverride.trim()) {
    const root = resolve(hostOverride);
    await verifyHostRevision({ packagePath, hostRoot: root });
    return root;
  }

  const source = resolve(sourceRoot);
  const revision = await readPinnedHostRevision(packagePath);
  assertLocalRevision(source, revision);
  const root = resolve(cacheRoot, revision);
  if (!(await isExpectedCheckout(packagePath, root))) {
    await mkdir(resolve(cacheRoot), { recursive: true });
    execFileSync("git", ["clone", "--quiet", "--local", "--no-checkout", source, root]);
    execFileSync("git", ["-C", root, "checkout", "--quiet", "--detach", revision]);
  }
  await verifyHostRevision({ packagePath, hostRoot: root });
  await reuseLockIdenticalDependencies(source, root);
  return root;
};

const assertLocalRevision = (source, revision) => {
  try {
    execFileSync("git", ["-C", source, "cat-file", "-e", `${revision}^{commit}`], {
      stdio: ["ignore", "ignore", "pipe"],
    });
  } catch {
    throw new Error(
      `TAO3K-LOCAL-E003 local Org Zhixing source does not contain pinned revision ${revision}: ${source}`,
    );
  }
};

const isExpectedCheckout = async (packagePath, root) => {
  try {
    await verifyHostRevision({ packagePath, hostRoot: root });
    return true;
  } catch (error) {
    if (String(error).includes("is not a Git checkout")) return false;
    throw error;
  }
};

const reuseLockIdenticalDependencies = async (source, root) => {
  const sourceModules = resolve(source, "node_modules");
  const targetModules = resolve(root, "node_modules");
  try {
    await access(resolve(targetModules, ".bin/rsbuild"));
    return;
  } catch {}

  let sourceLock;
  let targetLock;
  try {
    [sourceLock, targetLock] = await Promise.all([
      readFile(resolve(source, "package-lock.json")),
      readFile(resolve(root, "package-lock.json")),
    ]);
    await access(resolve(sourceModules, ".bin/rsbuild"));
  } catch {
    throw new Error("TAO3K-LOCAL-E004 local Org Zhixing dependencies are not installed");
  }
  if (!sourceLock.equals(targetLock)) {
    throw new Error(
      "TAO3K-LOCAL-E004 pinned Org Zhixing package-lock differs from the local source",
    );
  }
  await symlink(sourceModules, targetModules, "dir");
};

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const [packagePath, sourceRoot, cacheRoot, hostOverride = ""] = process.argv.slice(2);
  if (!packagePath || !sourceRoot || !cacheRoot) {
    throw new Error(
      "TAO3K-LOCAL-E003 usage: prepare-local-host.mjs <package.json> <source-root> <cache-root> [host-override]",
    );
  }
  console.log(await prepareLocalHost({ cacheRoot, hostOverride, packagePath, sourceRoot }));
}
