import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import {
  loadPooFlowWasmRuntime,
  PFW_BUNDLE_SYMBOL_KIND_COMPONENT,
  PFW_BUNDLE_SYMBOL_KIND_POLICY,
} from "@poo-flow/runtime-wasm";

const root = resolve(import.meta.dirname, "../..");
const projection = JSON.parse(
  await readFile(resolve(root, "theme/generated/principles-interactive.json"), "utf8"),
);
const [wasm, descriptor, arena] = await Promise.all([
  readFile(fileURLToPath(import.meta.resolve("@poo-flow/runtime-wasm/wasm"))),
  readFile(resolve(root, "theme/generated/human-capability.descriptor.bin")),
  readFile(resolve(root, "theme/generated/human-capability.arena.bin")),
]);

const fail = (message) => {
  throw new Error(`TAO3K-PRINCIPLES-E301 ${message}`);
};

const expectedNodes = new Map(projection.topology.nodes.map((node) => [node.id, node]));
const expectedPolicyCount = projection.topology.nodes.filter(
  ({ kind }) => kind !== "composition",
).length;
const runtime = await loadPooFlowWasmRuntime({ bytes: wasm });
const topology = runtime.openTopology({ descriptor, arena });

try {
  const components = topology.components();
  const symbols = topology.symbols();
  const componentNames = new Map(
    symbols
      .filter(({ kind }) => kind === PFW_BUNDLE_SYMBOL_KIND_COMPONENT)
      .map(({ id, value }) => [id.key, value]),
  );
  const policyCount = symbols.filter(({ kind }) => kind === PFW_BUNDLE_SYMBOL_KIND_POLICY).length;

  if (components.length !== expectedNodes.size) {
    fail(`expected ${expectedNodes.size} components; received ${components.length}`);
  }
  if (policyCount !== expectedPolicyCount) {
    fail(`expected ${expectedPolicyCount} policies; received ${policyCount}`);
  }

  for (const component of components) {
    const semanticId = componentNames.get(component.componentId.key);
    const node = semanticId ? expectedNodes.get(semanticId) : undefined;
    if (!node) fail(`component ${component.componentId.key} has no Org projection`);

    const policy = topology.policyForComponent(component);
    if (node.kind === "composition" && policy) {
      fail(`composition ${semanticId} unexpectedly owns policy ${policy.value}`);
    }
    if (node.kind !== "composition" && !policy) {
      fail(`${node.kind} ${semanticId} has no runtime policy`);
    }
  }

  console.log(
    `principles-bundle-runtime status=ok components=${components.length} policies=${policyCount}`,
  );
} finally {
  topology.release();
}
