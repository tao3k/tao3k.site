import { graphlib, layout } from "@dagrejs/dagre";
import {
  loadPooFlowWasmRuntime,
  PFW_BUNDLE_SYMBOL_KIND_COMPONENT,
  PFW_BUNDLE_SYMBOL_KIND_POLICY,
  type PooFlowTopologyComponent,
  type PooFlowTopology,
  type WorkflowCursorSession,
} from "@poo-flow/runtime-wasm";
import wasmUrl from "@poo-flow/runtime-wasm/wasm?url";
import type { Edge, Node } from "@xyflow/react";
import arenaUrl from "../../generated/human-capability.arena.bin?url";
import descriptorUrl from "../../generated/human-capability.descriptor.bin?url";
import generatedProjection from "../../generated/principles-interactive.json";

export type PrinciplesFlowStatus = "waiting" | "ready" | "running" | "complete";

type OrgFlowNode = Readonly<{
  id: string;
  order: number;
  kind: "composition" | "case" | "profile";
  title: string;
  summary: string;
  result: string;
  boundary: string;
  human: string;
  ai: string;
  tone: string;
  pressure: string;
  guard: string;
}>;

type PressureEntry = Readonly<{
  id: string;
  full: string;
  useIf: string;
}>;

type PrinciplesProjection = Readonly<{
  schemaVersion: 1;
  topology: Readonly<{ id: "human-capability"; nodes: readonly OrgFlowNode[] }>;
  pressure: Readonly<{ entries: readonly PressureEntry[] }>;
}>;

export type PrinciplesFlowNodeData = Readonly<{
  semanticId: string;
  order: number;
  kind: OrgFlowNode["kind"];
  title: string;
  summary: string;
  result: string;
  boundary: string;
  human: string;
  ai: string;
  tone: string;
  pressure: string;
  guard: string;
  pressureDetail: string;
  status: PrinciplesFlowStatus;
}> &
  Record<string, unknown>;

export type PrinciplesFlowNode = Node<PrinciplesFlowNodeData, "principle">;
export type PrinciplesFlowEdge = Edge<Readonly<{ order: number }>>;

export type PrinciplesFlowModel = Readonly<{
  nodes: readonly PrinciplesFlowNode[];
  edges: readonly PrinciplesFlowEdge[];
}>;

export type PrinciplesFlowSession = Readonly<{
  model: PrinciplesFlowModel;
  cursor: WorkflowCursorSession;
  release: () => void;
}>;

const projection = generatedProjection as PrinciplesProjection;
const expectedNodeCount = projection.topology.nodes.length;
const expectedPolicyCount = projection.topology.nodes.filter(
  ({ kind }) => kind !== "composition",
).length;
const runtimePromise = loadPooFlowWasmRuntime({ url: wasmUrl });

const fetchBytes = async (url: string, owner: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TAO3K-PRINCIPLES-E101 ${owner} returned ${response.status}`);
  }
  return response.arrayBuffer();
};

const bundlePromise = Promise.all([
  fetchBytes(descriptorUrl, "descriptor"),
  fetchBytes(arenaUrl, "arena"),
]);

const dimensions = (kind: OrgFlowNode["kind"]) => {
  if (kind === "composition") return { width: 440, height: 168 };
  if (kind === "case") return { width: 330, height: 184 };
  return { width: 286, height: 176 };
};

const layoutTopology = (
  components: readonly PooFlowTopologyComponent[],
  names: ReadonlyMap<string, string>,
  metadata: ReadonlyMap<string, OrgFlowNode>,
  pressureDetails: ReadonlyMap<string, string>,
  topologyEdges: readonly PrinciplesFlowEdge[],
  topology: PooFlowTopology,
): PrinciplesFlowModel => {
  const graph = new graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  graph.setGraph({
    rankdir: "TB",
    ranksep: 92,
    nodesep: 52,
    edgesep: 28,
    marginx: 44,
    marginy: 38,
    ranker: "network-simplex",
  });

  const nodes = components.map((component) => {
    const semanticId = names.get(component.componentId.key);
    const presentation = semanticId ? metadata.get(semanticId) : undefined;
    if (!semanticId || !presentation) {
      throw new Error(
        `TAO3K-PRINCIPLES-E102 Bundle component ${component.componentId.key} has no Org presentation`,
      );
    }
    const policy = topology.policyForComponent(component);
    if (presentation.kind !== "composition" && !policy) {
      throw new Error(
        `TAO3K-PRINCIPLES-E106 Bundle component ${semanticId} is missing its declared policy`,
      );
    }
    const node: PrinciplesFlowNode = {
      id: component.componentId.key,
      type: "principle",
      position: { x: 0, y: 0 },
      data: {
        ...presentation,
        guard: policy?.value ?? presentation.guard,
        semanticId,
        pressureDetail: pressureDetails.get(presentation.pressure) ?? presentation.pressure,
        status: "waiting",
      },
    };
    graph.setNode(node.id, dimensions(presentation.kind));
    return node;
  });

  for (const edge of topologyEdges) graph.setEdge(edge.source, edge.target, { weight: 2 });
  layout(graph);

  return {
    nodes: nodes.map((node) => {
      const position = graph.node(node.id);
      const size = dimensions(node.data.kind);
      return {
        ...node,
        position: { x: position.x - size.width / 2, y: position.y - size.height / 2 },
        style: size,
      };
    }),
    edges: topologyEdges,
  };
};

export const openPrinciplesFlowSession = async (): Promise<PrinciplesFlowSession> => {
  const [runtime, [descriptor, arena]] = await Promise.all([runtimePromise, bundlePromise]);
  const topology = runtime.openTopology({ descriptor, arena });
  let cursor: WorkflowCursorSession | undefined;
  try {
    if (topology.componentCount !== expectedNodeCount) {
      throw new Error(
        `TAO3K-PRINCIPLES-E103 Bundle expected ${expectedNodeCount} components; received ${topology.componentCount}`,
      );
    }

    const symbols = topology.symbols();
    const componentSymbols = new Map(
      symbols
        .filter(({ kind }) => kind === PFW_BUNDLE_SYMBOL_KIND_COMPONENT)
        .map(({ id, value }) => [id.key, value]),
    );
    const policyCount = symbols.filter(({ kind }) => kind === PFW_BUNDLE_SYMBOL_KIND_POLICY).length;
    if (policyCount !== expectedPolicyCount) {
      throw new Error(
        `TAO3K-PRINCIPLES-E107 Bundle expected ${expectedPolicyCount} policies; received ${policyCount}`,
      );
    }
    const metadata = new Map(projection.topology.nodes.map((node) => [node.id, node]));
    const pressureDetails = new Map(
      projection.pressure.entries.map(({ id, full, useIf }) => [id, `${full} — ${useIf}`]),
    );
    const components = [...topology.components()].sort((left, right) =>
      Number(left.compositionOrder - right.compositionOrder),
    );
    const names = new Map(
      components.map((component) => {
        const name = componentSymbols.get(component.componentId.key);
        if (!name) {
          throw new Error(
            `TAO3K-PRINCIPLES-E105 Bundle component ${component.componentId.key} has no symbol`,
          );
        }
        return [component.componentId.key, name];
      }),
    );
    const edges = topology.edges().map(
      (edge, index): PrinciplesFlowEdge => ({
        id: `bundle-edge-${edge.compositionOrder.toString()}-${index}`,
        source: edge.sourceComponentId.key,
        target: edge.targetComponentId.key,
        type: "smoothstep",
        data: { order: Number(edge.compositionOrder) },
      }),
    );

    const semanticIds = new Set(names.values());
    if (
      semanticIds.size !== expectedNodeCount ||
      projection.topology.nodes.some(({ id }) => !semanticIds.has(id))
    ) {
      throw new Error("TAO3K-PRINCIPLES-E104 Bundle symbols and Org flow nodes diverged");
    }

    const model = layoutTopology(components, names, metadata, pressureDetails, edges, topology);
    cursor = topology.openCursor();
    return {
      model,
      cursor,
      release: () => {
        cursor?.release();
        topology.release();
      },
    };
  } catch (error) {
    cursor?.release();
    topology.release();
    throw error;
  }
};
