import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { promisify } from "node:util";
import { parse } from "smol-toml";

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, "../..");
const fixtureRoot = await mkdtemp(join(tmpdir(), "tao3k-local-config-"));
const source = join(fixtureRoot, "source.toml");
const target = join(fixtureRoot, "generated", "local.toml");
const localEntry = "http://127.0.0.1:4174/mf-manifest.json";

try {
  await writeFile(
    source,
    'theme = "tao3k-site"\n\n[site]\ntitle = "TAO THREE K"\n\n[theme_remotes.tao3k-site]\nremote = "tao3k_site"\nentry = "https://example.test/mf-manifest.json"\n',
    "utf8",
  );

  await execFileAsync(process.execPath, [
    resolve(root, "theme/src/build/prepare-local-config.mjs"),
    source,
    target,
    localEntry,
  ]);

  const config = parse(await readFile(target, "utf8"));
  if (config.site?.title !== "TAO THREE K") {
    throw new Error("local config generation did not preserve the site table");
  }
  if (config.theme !== "tao3k-site") {
    throw new Error("local config generation did not preserve the theme id");
  }
  if (config.theme_remotes?.["tao3k-site"]?.entry !== localEntry) {
    throw new Error("local config generation did not replace the theme entry");
  }

  console.log(`tao3k-local-config-check status=ok entry=${localEntry}`);
} finally {
  await rm(fixtureRoot, { recursive: true, force: true });
}
