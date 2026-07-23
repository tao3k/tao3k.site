import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { initSync, Org } from "orgize";

const root = resolve(import.meta.dirname, "../../..");
const sourcePath = resolve(root, "docs/principles/30.04_public_values_and_alignment_surface.org");
const targetPath = resolve(root, "theme/generated/principles-interactive.json");
const expectedChoiceId = "principle-pressure";
const expectedTopologyId = "human-capability";
const expectedNodeCount = 11;
const flowFields = [
  "FLOW_NODE",
  "FLOW_ORDER",
  "FLOW_KIND",
  "FLOW_TITLE",
  "FLOW_SUMMARY",
  "FLOW_RESULT",
  "FLOW_BOUNDARY",
  "FLOW_HUMAN",
  "FLOW_AI",
  "FLOW_TONE",
  "FLOW_PRESSURE",
];

initSync({ module: await readFile(new URL(import.meta.resolve("orgize/wasm"))) });

const source = await readFile(sourcePath, "utf8");
const document = new Org(source);
let interactiveProjection;
let sectionProjection;
try {
  interactiveProjection = JSON.parse(document.orgInteractiveJson());
  sectionProjection = JSON.parse(document.sectionIndexJson(sourcePath));
} finally {
  document.free();
}

if (interactiveProjection.schemaVersion !== 1 || !Array.isArray(interactiveProjection.choices)) {
  throw new Error("TAO3K-PRINCIPLES-E001 unsupported Org-Interactive projection");
}

if (sectionProjection.schemaVersion !== 1 || !Array.isArray(sectionProjection.records)) {
  throw new Error("TAO3K-PRINCIPLES-E004 unsupported Org section-index projection");
}

const matches = interactiveProjection.choices.filter(({ id }) => id === expectedChoiceId);
if (matches.length !== 1) {
  throw new Error(
    `TAO3K-PRINCIPLES-E002 expected one ${expectedChoiceId} choice, received ${matches.length}`,
  );
}

const propertyMap = (record) =>
  new Map(record.properties.map(({ key, value }) => [String(key).toUpperCase(), String(value)]));

const nodes = sectionProjection.records.flatMap((record) => {
  const properties = propertyMap(record);
  if (!properties.has("FLOW_NODE")) return [];
  const missing = flowFields.filter((field) => !properties.get(field));
  if (missing.length > 0) {
    throw new Error(
      `TAO3K-PRINCIPLES-E005 ${record.titleText ?? record.title} misses ${missing.join(", ")}`,
    );
  }
  const order = Number(properties.get("FLOW_ORDER"));
  if (!Number.isSafeInteger(order) || order < 1) {
    throw new Error(`TAO3K-PRINCIPLES-E006 invalid FLOW_ORDER ${properties.get("FLOW_ORDER")}`);
  }
  return [
    {
      id: properties.get("FLOW_NODE"),
      order,
      kind: properties.get("FLOW_KIND"),
      title: properties.get("FLOW_TITLE"),
      summary: properties.get("FLOW_SUMMARY"),
      result: properties.get("FLOW_RESULT"),
      boundary: properties.get("FLOW_BOUNDARY"),
      human: properties.get("FLOW_HUMAN"),
      ai: properties.get("FLOW_AI"),
      tone: properties.get("FLOW_TONE"),
      pressure: properties.get("FLOW_PRESSURE"),
    },
  ];
});

nodes.sort((left, right) => left.order - right.order);
if (
  nodes.length !== expectedNodeCount ||
  new Set(nodes.map(({ id }) => id)).size !== expectedNodeCount ||
  nodes.some(({ order }, index) => order !== index + 1)
) {
  throw new Error(
    `TAO3K-PRINCIPLES-E007 expected ${expectedNodeCount} unique contiguous flow nodes`,
  );
}

const output = `${JSON.stringify(
  {
    schemaVersion: 1,
    topology: { id: expectedTopologyId, nodes },
    pressure: matches[0],
  },
  null,
  2,
)}\n`;
if (process.argv.includes("--check")) {
  const current = await readFile(targetPath, "utf8").catch(() => "");
  if (current !== output) {
    throw new Error(
      "TAO3K-PRINCIPLES-E003 generated projection is stale; run npm run principles:generate",
    );
  }
  console.log(`principles-interactive status=current id=${expectedChoiceId} nodes=${nodes.length}`);
} else {
  await mkdir(dirname(targetPath), { recursive: true });
  const temporaryPath = `${targetPath}.${process.pid}.tmp`;
  try {
    await writeFile(temporaryPath, output);
    await rename(temporaryPath, targetPath);
  } finally {
    await rm(temporaryPath, { force: true });
  }
  console.log(
    `principles-interactive status=generated id=${expectedChoiceId} nodes=${nodes.length}`,
  );
}
