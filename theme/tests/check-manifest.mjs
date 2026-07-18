import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const packageJson = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"));
const manifestPath = resolve(root, "theme/dist/mf-manifest.json");
const federationManifest = JSON.parse(await readFile(manifestPath, "utf8"));
const theme = packageJson.orgZhixing;

const fail = (message) => {
  throw new Error(`THEME-DOWNSTREAM-E001 ${message}`);
};

if (theme?.id !== "tao3k-site") fail("package.json#orgZhixing.id drifted");
if (theme?.federation?.protocol !== "org-zhixing/theme-module/v1") {
  fail("the Zhixing module protocol drifted");
}
if (theme?.contract?.package !== "@org-zhixing/theme-contract") {
  fail("the provider is not bound to the Zhixing contract package");
}
if (theme?.federation?.remote !== federationManifest.name) {
  fail(
    `remote name mismatch: package=${theme?.federation?.remote} manifest=${federationManifest.name}`,
  );
}

const serializedManifest = JSON.stringify(federationManifest);
if (!serializedManifest.includes('"./theme"')) fail("mf-manifest.json does not expose ./theme");
if (!serializedManifest.includes("remoteEntry")) fail("mf-manifest.json has no remote entry");

const remoteEntryName = federationManifest.metaData?.remoteEntry?.name;
const publicPath = federationManifest.metaData?.publicPath;
const remoteEntry =
  typeof remoteEntryName === "string" && typeof publicPath === "string"
    ? new URL(remoteEntryName, publicPath).href
    : null;
if (remoteEntry === null || !/^https?:\/\//u.test(remoteEntry)) {
  fail(`remote entry must resolve absolutely for a cross-origin host: ${String(remoteEntry)}`);
}

console.log(
  `zhixing-theme-contract status=ok id=${theme.id} remote=${federationManifest.name} expose=./theme entry=${remoteEntry}`,
);
