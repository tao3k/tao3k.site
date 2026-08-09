import { access, readdir, readFile } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { initSync, Org } from "orgize";
import { parse } from "smol-toml";

initSync({ module: await readFile(new URL(import.meta.resolve("orgize/wasm"))) });

export const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));

export const documentationRoots = Object.freeze(["content", "docs", "theme"]);

export const ignoredDirectories = new Set([
  ".cache",
  ".data",
  ".git",
  ".output",
  "dist",
  "node_modules",
]);

export const requiredKeywords = Object.freeze([
  "TITLE",
  "DATE",
  "AUTHOR",
  "FILETAGS",
  "STATUS",
  "OWNER",
  "AUDIENCE",
  "CLAIM_MATURITY",
]);

export const contractId = "tao3k.document";
export const contractSource = "docs/contracts/90.01_document_contract.org";
export const contractConfigurations = Object.freeze([
  "theme/examples/org-zhixing.local.toml",
  "theme/examples/org-zhixing.pages.toml",
]);

const allowedStatuses = new Set([
  "active",
  "accepted",
  "archived",
  "draft",
  "proposed",
  "superseded",
]);

const allowedClaimMaturities = new Set([
  "active-development",
  "policy",
  "research",
  "shipped",
  "vision",
]);

const error = (code, file, detail) => `${code} ${relative(root, file)} ${detail}`;

const addInventoryFile = (inventory, file) => {
  const extension = extname(file).toLowerCase();
  if (extension === ".org") inventory.org.push(file);
  if (extension === ".md" || extension === ".markdown") inventory.markdown.push(file);
};

export const collect = async (directory, inventory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      await collect(path, inventory);
      continue;
    }

    if (entry.isFile()) addInventoryFile(inventory, path);
  }
};

export const parseDocumentKeywords = (source) => {
  const keywords = new Map();
  const pattern = /^#\+([A-Z0-9_]+):[ \t]*(.*?)[ \t]*$/gim;

  for (const match of source.matchAll(pattern)) {
    const key = match[1].toUpperCase();
    const values = keywords.get(key) ?? [];
    values.push(match[2]);
    keywords.set(key, values);
  }

  return keywords;
};

const validateRequiredKeywords = (file, keywords) => {
  const failures = [];

  for (const key of requiredKeywords) {
    const values = keywords.get(key) ?? [];
    if (values.length === 0 || values[0].trim().length === 0) {
      failures.push(error("ORG-DOC-E002", file, `missing #+${key}`));
    }
    if (values.length > 1) {
      failures.push(error("ORG-DOC-E003", file, `duplicate #+${key}`));
    }
  }

  return failures;
};

const validateDate = (file, value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? []
    : [error("ORG-DOC-E004", file, "DATE must use YYYY-MM-DD")];

const validateFiletags = (file, value) => {
  const validShape = /^:(?:[A-Za-z0-9@_+#%.-]+:)+$/.test(value);
  const tags = value.toLowerCase().split(":").filter(Boolean);

  if (validShape && tags.includes("tao3k")) return [];
  return [
    error(
      "ORG-DOC-E005",
      file,
      `FILETAGS must use :tag: syntax and include :tao3k:; received=${JSON.stringify(value)}`,
    ),
  ];
};

const validateEnum = (file, code, label, value, allowed) =>
  allowed.has(value.toLowerCase())
    ? []
    : [error(code, file, `${label} must be one of ${[...allowed].sort().join(", ")}`)];

export const validateOrgDocument = (file, source) => {
  const keywords = parseDocumentKeywords(source);
  const failures = validateRequiredKeywords(file, keywords);
  const value = (key) => keywords.get(key)?.[0]?.trim() ?? "";

  if (value("DATE")) failures.push(...validateDate(file, value("DATE")));
  if (value("FILETAGS")) {
    failures.push(...validateFiletags(file, value("FILETAGS")));
  }
  if (value("STATUS")) {
    failures.push(
      ...validateEnum(file, "ORG-DOC-E006", "STATUS", value("STATUS"), allowedStatuses),
    );
  }
  if (value("CLAIM_MATURITY")) {
    failures.push(
      ...validateEnum(
        file,
        "ORG-DOC-E007",
        "CLAIM_MATURITY",
        value("CLAIM_MATURITY"),
        allowedClaimMaturities,
      ),
    );
  }
  if (!/^\*+[ \t]+\S+/m.test(source)) {
    failures.push(error("ORG-DOC-E008", file, "missing Org heading"));
  }

  const prose = source
    .replace(/^#\+.*$/gm, "")
    .replace(/^:[A-Z0-9_]+:.*$/gm, "")
    .replace(/^[*]+[ \t]+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
  if (prose.length < 80) {
    failures.push(error("ORG-DOC-E009", file, "readable content must contain 80 characters"));
  }
  if (/\[\[id:/i.test(source)) {
    failures.push(
      error("ORG-DOC-E010", file, "id links are not portable here; use a relative file link"),
    );
  }

  return failures;
};

export const validateFileLinks = async (file, source) => {
  const failures = [];
  const pattern = /\[\[file:([^\]\n]+?)\](?:\[[^\]\n]*\])?\]/gi;

  for (const match of source.matchAll(pattern)) {
    const reference = match[1].split("::", 1)[0];
    const target = resolve(dirname(file), reference);
    try {
      await access(target);
    } catch {
      failures.push(error("ORG-DOC-E011", file, `missing file link target ${reference}`));
    }
  }

  return failures;
};

export const validateContentContractBinding = async (file, source) => {
  if (!relative(root, file).startsWith("content/")) return [];
  const registrySource = await readFile(resolve(root, contractSource), "utf8");
  const document = new Org(source);
  try {
    document.validateContracts(
      JSON.stringify({
        registrySources: [{ path: contractSource, source: registrySource }],
        requiredContractIds: [contractId],
        sourcePath: relative(root, file),
      }),
    );
    return [];
  } catch (cause) {
    return [error("ORG-DOC-E012", file, String(cause))];
  } finally {
    document.free();
  }
};

export const validateContractRegistry = (file, source) => {
  const document = new Org(source);
  try {
    document.validateContractSource(relative(root, file));
    return [];
  } catch (cause) {
    return [error("ORG-DOC-E013", file, String(cause))];
  } finally {
    document.free();
  }
};

export const validateOrgInteractive = (file, source) => {
  const document = new Org(source);
  try {
    document.orgInteractiveJson();
    return [];
  } catch (cause) {
    return [error("ORG-DOC-E015", file, `invalid Org-Interactive contract: ${String(cause)}`)];
  } finally {
    document.free();
  }
};

export const validateContractConfigurations = async () => {
  const failures = [];

  for (const configuration of contractConfigurations) {
    const file = resolve(root, configuration);
    const source = await readFile(file, "utf8");

    let parsed;
    try {
      parsed = parse(source);
    } catch (cause) {
      failures.push(error("ORG-DOC-E014", file, `invalid TOML: ${String(cause)}`));
      continue;
    }

    const sources = parsed.contracts?.sources;
    const hasContractSource =
      Array.isArray(sources) &&
      sources.every((value) => typeof value === "string") &&
      sources.includes(contractSource);
    if (!hasContractSource) {
      failures.push(
        error("ORG-DOC-E014", file, `must register contracts.sources=${contractSource}`),
      );
    }
  }

  return failures;
};

export const validateDocumentation = async () => {
  const inventory = { org: [], markdown: [] };
  for (const directory of documentationRoots) {
    await collect(resolve(root, directory), inventory);
  }

  const failures = inventory.markdown.map((file) =>
    error("ORG-DOC-E001", file, "Markdown is prohibited; use Org"),
  );

  for (const file of inventory.org.sort()) {
    const source = await readFile(file, "utf8");
    failures.push(...validateOrgDocument(file, source));
    failures.push(...validateOrgInteractive(file, source));
    failures.push(...(await validateFileLinks(file, source)));
    failures.push(...(await validateContentContractBinding(file, source)));
    if (relative(root, file) === contractSource) {
      failures.push(...validateContractRegistry(file, source));
    }
  }
  failures.push(...(await validateContractConfigurations()));

  return { failures: failures.sort(), inventory };
};

const main = async () => {
  const { failures, inventory } = await validateDocumentation();

  if (failures.length > 0) {
    for (const failure of failures) console.error(failure);
    console.error(
      `org-docs-contract status=failed files=${inventory.org.length} markdown=${inventory.markdown.length} failures=${failures.length}`,
    );
    process.exitCode = 1;
    return;
  }

  console.log(
    `org-docs-contract status=ok files=${inventory.org.length} markdown=0 required=${requiredKeywords.length}`,
  );
};

await main();
