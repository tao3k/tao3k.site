import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { parse, stringify } from "smol-toml";

const [sourceArgument, targetArgument, entry] = process.argv.slice(2);

if (!sourceArgument || !targetArgument || !entry) {
  throw new Error(
    "TAO3K-LOCAL-E001 usage: prepare-local-config.mjs <source> <target> <theme-entry>",
  );
}

const source = resolve(sourceArgument);
const target = resolve(targetArgument);
const config = parse(await readFile(source, "utf8"));
const themeId = config.theme;
const themeRemotes = config.theme_remotes;
const selectedRemote =
  typeof themeId === "string" &&
  themeRemotes &&
  typeof themeRemotes === "object" &&
  !Array.isArray(themeRemotes)
    ? themeRemotes[themeId]
    : null;

if (!selectedRemote || typeof selectedRemote !== "object" || Array.isArray(selectedRemote)) {
  throw new Error(
    "TAO3K-LOCAL-E002 org-zhixing.toml must select a theme with a matching [theme_remotes.<id>] table",
  );
}

selectedRemote.entry = entry;

await mkdir(dirname(target), { recursive: true });
await writeFile(target, stringify(config), "utf8");

console.log(`tao3k-local-config status=ok entry=${entry} target=${target}`);
