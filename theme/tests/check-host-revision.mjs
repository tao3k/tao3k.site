import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { verifyHostRevision } from "../src/build/verify-host-revision.mjs";

const root = await mkdtemp(resolve(tmpdir(), "tao3k-host-revision-"));
const hostRoot = resolve(root, "host");
execFileSync("git", ["init", "--quiet", hostRoot]);
execFileSync("git", ["-C", hostRoot, "config", "user.email", "test@tao3k.invalid"]);
execFileSync("git", ["-C", hostRoot, "config", "user.name", "TAO3K test"]);
await writeFile(resolve(hostRoot, "fixture"), "host\n");
execFileSync("git", ["-C", hostRoot, "add", "fixture"]);
execFileSync("git", ["-C", hostRoot, "commit", "--quiet", "-m", "fixture"]);
const revision = execFileSync("git", ["-C", hostRoot, "rev-parse", "HEAD"], {
  encoding: "utf8",
}).trim();
const packagePath = resolve(root, "package.json");
await writeFile(packagePath, JSON.stringify({ orgZhixing: { contract: { revision } } }));

assert.deepEqual(await verifyHostRevision({ packagePath, hostRoot }), {
  expected: revision,
  received: revision,
});

await writeFile(
  packagePath,
  JSON.stringify({ orgZhixing: { contract: { revision: "0".repeat(40) } } }),
);
await assert.rejects(
  verifyHostRevision({ packagePath, hostRoot }),
  /TAO3K-LOCAL-E002 Org Zhixing host revision mismatch/,
);

console.log("tao3k-host-revision-check status=ok");
