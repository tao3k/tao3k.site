import {
  Background,
  BackgroundVariant,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type NodeTypes,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  openPrinciplesFlowSession,
  type PrinciplesFlowEdge,
  type PrinciplesFlowModel,
  type PrinciplesFlowNode,
  type PrinciplesFlowSession,
} from "./principles-flow-model";
import { PrinciplesFlowNodeView } from "./principles-flow-node";
import "./principles-flow.css";

const nodeTypes: NodeTypes = { principle: PrinciplesFlowNodeView };
const fitOptions = { padding: 0.16, duration: 520, maxZoom: 1.05 } as const;

function PrinciplesFlowCanvas() {
  const [model, setModel] = useState<PrinciplesFlowModel>();
  const [completedSteps, setCompletedSteps] = useState(0);
  const [selectedId, setSelectedId] = useState<string>();
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string>();
  const sessionRef = useRef<PrinciplesFlowSession | undefined>(undefined);
  const { fitView } = useReactFlow<PrinciplesFlowNode, PrinciplesFlowEdge>();

  useEffect(() => {
    let disposed = false;
    void openPrinciplesFlowSession()
      .then((session) => {
        if (disposed) {
          session.release();
          return;
        }
        sessionRef.current = session;
        setModel(session.model);
        setSelectedId(
          session.model.nodes.find(({ data }) => data.semanticId === "human-capability")?.id,
        );
      })
      .catch((reason: unknown) => {
        if (!disposed) setError(reason instanceof Error ? reason.message : String(reason));
      });
    return () => {
      disposed = true;
      sessionRef.current?.release();
      sessionRef.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (!model) return;
    const frame = requestAnimationFrame(() => void fitView(fitOptions));
    return () => cancelAnimationFrame(frame);
  }, [fitView, model]);

  const step = useCallback(() => {
    const session = sessionRef.current;
    if (!session) return;
    const snapshot = session.cursor.step();
    setCompletedSteps(snapshot.completedSteps);
    if (snapshot.completedSteps >= snapshot.stepCount) setRunning(false);
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(step, 680);
    return () => window.clearInterval(interval);
  }, [running, step]);

  const reset = useCallback(() => {
    const session = sessionRef.current;
    if (!session) return;
    setRunning(false);
    setCompletedSteps(session.cursor.reset().completedSteps);
    requestAnimationFrame(() => void fitView(fitOptions));
  }, [fitView]);

  const toggleRun = useCallback(() => {
    const session = sessionRef.current;
    if (!session) return;
    if (completedSteps >= session.cursor.stepCount) {
      setCompletedSteps(session.cursor.reset().completedSteps);
      setRunning(true);
      return;
    }
    setRunning((value) => !value);
  }, [completedSteps]);

  const nodes = useMemo(
    () =>
      model?.nodes.map((node) => ({
        ...node,
        selected: node.id === selectedId,
        data: {
          ...node.data,
          status:
            node.data.order <= completedSteps
              ? ("complete" as const)
              : node.data.order === completedSteps + 1
                ? ("active" as const)
                : ("waiting" as const),
        },
      })) ?? [],
    [completedSteps, model, selectedId],
  );

  const nodeOrder = useMemo(
    () => new Map(model?.nodes.map(({ id, data }) => [id, data.order]) ?? []),
    [model],
  );
  const edges = useMemo(
    () =>
      model?.edges.map((edge) => {
        const sourceOrder = nodeOrder.get(edge.source) ?? Number.MAX_SAFE_INTEGER;
        const targetOrder = nodeOrder.get(edge.target) ?? Number.MAX_SAFE_INTEGER;
        const complete = sourceOrder <= completedSteps && targetOrder <= completedSteps;
        const active = sourceOrder <= completedSteps && targetOrder === completedSteps + 1;
        return {
          ...edge,
          animated: running && active,
          className: complete ? "is-complete" : active ? "is-active" : "is-waiting",
        };
      }) ?? [],
    [completedSteps, model, nodeOrder, running],
  );

  const selectedNode = nodes.find(({ id }) => id === selectedId) ?? nodes[0];
  const stepCount = sessionRef.current?.cursor.stepCount ?? model?.nodes.length ?? 0;

  if (error) {
    return (
      <div className="tao3k-principles-flow__error" role="alert">
        <strong>Topology unavailable</strong>
        <span>{error}</span>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="tao3k-principles-flow__loading" aria-live="polite">
        <span />
        Loading the verified capability topology…
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodeClick={(_, node) => setSelectedId(node.id)}
      nodesDraggable
      nodesConnectable={false}
      elementsSelectable
      panOnDrag
      zoomOnScroll={false}
      zoomOnPinch
      minZoom={0.38}
      maxZoom={1.5}
      fitView
      fitViewOptions={fitOptions}
      proOptions={{ hideAttribution: true }}
      aria-label="POO Flow human capability composition"
    >
      <Background variant={BackgroundVariant.Dots} gap={30} size={1} />

      {selectedNode ? (
        <Panel position="top-right" className="tao3k-principles-inspector">
          <header>
            <span>{selectedNode.data.kind}</span>
            <strong>{selectedNode.data.boundary}</strong>
          </header>
          <h3>{selectedNode.data.title}</h3>
          <p>{selectedNode.data.summary}</p>
          <dl>
            <div>
              <dt>Human</dt>
              <dd>{selectedNode.data.human}</dd>
            </div>
            <div>
              <dt>AI</dt>
              <dd>{selectedNode.data.ai}</dd>
            </div>
            <div>
              <dt>Pressure test</dt>
              <dd>{selectedNode.data.pressureDetail}</dd>
            </div>
          </dl>
          <footer>{selectedNode.data.result}</footer>
        </Panel>
      ) : null}

      <Panel position="bottom-center" className="tao3k-principles-runtime">
        <div>
          <span>WASM CURSOR</span>
          <strong>
            {String(completedSteps).padStart(2, "0")} / {String(stepCount).padStart(2, "0")}
          </strong>
        </div>
        <button type="button" onClick={toggleRun}>
          {running ? "Pause" : completedSteps >= stepCount ? "Replay" : "Run"}
        </button>
        <button type="button" onClick={step} disabled={running || completedSteps >= stepCount}>
          Step
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </Panel>
    </ReactFlow>
  );
}

export function PrinciplesFlow() {
  return (
    <section className="tao3k-principles-flow" aria-labelledby="principles-flow-title">
      <header className="tao3k-principles-flow__header">
        <div>
          <p className="tao3k-route-kicker">THE KNOWLEDGE–ACTION INTERFACE</p>
          <h2 id="principles-flow-title">Information is abundant. Agency is not.</h2>
        </div>
        <p>
          The graph is compiled from Scheme, validated as Bundle v1, executed by WASM, and explained
          by Org. Drag the topology freely; Run never steals the viewport, while Reset returns the
          complete composition to view.
        </p>
      </header>
      <div className="tao3k-principles-flow__surface">
        <ReactFlowProvider>
          <PrinciplesFlowCanvas />
        </ReactFlowProvider>
      </div>
    </section>
  );
}
