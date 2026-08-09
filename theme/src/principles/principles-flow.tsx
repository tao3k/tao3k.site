import {
  Background,
  BackgroundVariant,
  Panel,
  ReactFlow,
  PanOnScrollMode,
  ReactFlowProvider,
  useReactFlow,
  type NodeTypes,
} from "@xyflow/react";
import { createHighlighterCore } from "@shikijs/core";
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";
import scheme from "@shikijs/langs/scheme";
import catppuccinMocha from "@shikijs/themes/catppuccin-mocha";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  openPrinciplesFlowSession,
  type PrinciplesFlowEdge,
  type PrinciplesFlowModel,
  type PrinciplesFlowNode,
  type PrinciplesFlowSession,
} from "./principles-flow-model";
import type { WorkflowCursorSnapshot } from "@poo-flow/runtime-wasm";
import { PrinciplesFlowNodeView } from "./principles-flow-node";
import { ProofExplorer } from "./proof-explorer";
import schemeSource from "./human-capability.ss?raw";
import "./principles-flow.css";

const nodeTypes: NodeTypes = { principle: PrinciplesFlowNodeView };
const fitOptions = { padding: 0.16, duration: 520, maxZoom: 1.05 } as const;
const schemeHighlighter = createHighlighterCore({
  langs: [scheme],
  themes: [catppuccinMocha],
  engine: createJavaScriptRegexEngine(),
});

const executionStateLabel = {
  waiting: "blocked",
  ready: "eligible",
  running: "checking",
  complete: "admitted",
} as const;

function PrinciplesFlowCanvas({
  focusedEvidenceId,
  onGraphFocusChange,
}: {
  focusedEvidenceId?: string;
  onGraphFocusChange?: (graphId: string) => void;
}) {
  const [model, setModel] = useState<PrinciplesFlowModel>();
  const [cursor, setCursor] = useState<WorkflowCursorSnapshot>({
    completedSteps: 0,
    stepCount: 0,
  });
  const [selectedId, setSelectedId] = useState<string>();
  const [pinnedNodeId, setPinnedNodeId] = useState<string>();
  const [running, setRunning] = useState(false);
  const [sourceOpen, setSourceOpen] = useState(false);
  const [sourceHtml, setSourceHtml] = useState<string>();
  const [error, setError] = useState<string>();
  const sessionRef = useRef<PrinciplesFlowSession | undefined>(undefined);
  const { fitView, setCenter } = useReactFlow<PrinciplesFlowNode, PrinciplesFlowEdge>();

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
        setCursor(session.cursor.position());
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
    if (!sourceOpen) return;
    let disposed = false;
    void schemeHighlighter
      .then((highlighter) =>
        highlighter.codeToHtml(schemeSource, { lang: "scheme", theme: "catppuccin-mocha" }),
      )
      .then((html) => {
        if (!disposed) setSourceHtml(html);
      })
      .catch((reason: unknown) => {
        if (!disposed) setError(reason instanceof Error ? reason.message : String(reason));
      });
    return () => {
      disposed = true;
    };
  }, [sourceOpen]);

  useEffect(() => {
    if (!model) return;
    const frame = requestAnimationFrame(() => void fitView(fitOptions));
    return () => cancelAnimationFrame(frame);
  }, [fitView, model]);

  useEffect(() => {
    if (!model || !focusedEvidenceId) return;
    const node = model.nodes.find(
      ({ id, data }) => id === focusedEvidenceId || data.semanticId === focusedEvidenceId,
    );
    if (!node) return;
    setSelectedId(node.id);
    setPinnedNodeId(node.id);
    const width = typeof node.style?.width === "number" ? node.style.width : 320;
    const height = typeof node.style?.height === "number" ? node.style.height : 176;
    const frame = requestAnimationFrame(
      () =>
        void setCenter(node.position.x + width / 2, node.position.y + height / 2, {
          duration: 520,
          zoom: 1,
        }),
    );
    return () => cancelAnimationFrame(frame);
  }, [focusedEvidenceId, model, setCenter]);

  const step = useCallback(() => {
    const session = sessionRef.current;
    if (!session) return;
    const snapshot = session.cursor.step();
    setCursor(snapshot);
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
    setPinnedNodeId(undefined);
    setCursor(session.cursor.reset());
    requestAnimationFrame(() => void fitView(fitOptions));
  }, [fitView]);

  const toggleRun = useCallback(() => {
    const session = sessionRef.current;
    if (!session) return;
    setPinnedNodeId(undefined);
    if (cursor.completedSteps >= session.cursor.stepCount) {
      setCursor(session.cursor.reset());
      setRunning(true);
      return;
    }
    setRunning((value) => !value);
  }, [cursor.completedSteps]);

  const nodes = useMemo(
    () =>
      model?.nodes.map((node) => ({
        ...node,
        selected: node.id === selectedId,
        data: {
          ...node.data,
          status:
            node.data.order <= cursor.completedSteps
              ? ("complete" as const)
              : node.data.order === cursor.completedSteps + 1 && running
                ? ("running" as const)
                : node.data.order === cursor.completedSteps + 1
                  ? ("ready" as const)
                  : ("waiting" as const),
        },
      })) ?? [],
    [cursor.completedSteps, model, running, selectedId],
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
        const complete =
          sourceOrder <= cursor.completedSteps && targetOrder <= cursor.completedSteps;
        const active =
          running &&
          sourceOrder <= cursor.completedSteps &&
          targetOrder === cursor.completedSteps + 1;
        const ready =
          !running &&
          sourceOrder <= cursor.completedSteps &&
          targetOrder === cursor.completedSteps + 1;
        return {
          ...edge,
          animated: running && active,
          className: complete
            ? "is-complete"
            : active
              ? "is-active"
              : ready
                ? "is-ready"
                : "is-waiting",
          label: complete ? "admitted" : active ? "checking" : ready ? "eligible" : "blocked",
          labelBgPadding: [6, 4] as [number, number],
          labelBgBorderRadius: 5,
        };
      }) ?? [],
    [cursor.completedSteps, model, nodeOrder, running],
  );

  const runtimeNode =
    nodes.find(({ data }) => data.status === "running") ??
    nodes.find(({ data }) => data.status === "ready");
  const inspectorNode =
    nodes.find(({ id }) => id === pinnedNodeId) ??
    runtimeNode ??
    nodes.find(({ id }) => id === selectedId) ??
    nodes[0];
  const inboundNodes =
    inspectorNode && model
      ? model.nodes.filter(({ id }) =>
          model.edges.some((edge) => edge.target === inspectorNode.id && edge.source === id),
        )
      : [];
  const outboundCount =
    inspectorNode && model
      ? model.edges.filter((edge) => edge.source === inspectorNode.id).length
      : 0;
  const transitionExplanation = !inspectorNode
    ? "No transition selected."
    : inboundNodes.length > 1
      ? "AND-join: " +
        inboundNodes.map(({ data }) => data.title).join(" + ") +
        " must each return an admitted receipt."
      : inboundNodes.length === 1
        ? "Serial gate: requires the admitted receipt from " + inboundNodes[0].data.title + "."
        : outboundCount > 1
          ? "Fan-out: once admitted, " +
            outboundCount +
            " downstream transitions may become eligible independently."
          : "Entry gate: this transition starts only after its declared condition is checked.";
  const stateExplanation = !inspectorNode
    ? ""
    : inspectorNode.data.status === "complete"
      ? "Admitted: the declared condition and predecessor receipt are satisfied."
      : inspectorNode.data.status === "running"
        ? "Checking: the declared condition is being evaluated before admission."
        : inspectorNode.data.status === "ready"
          ? "Eligible: predecessor receipts are present; this condition is next for evaluation."
          : "Blocked: waiting for the required predecessor receipt or entry condition.";
  const stepCount = cursor.stepCount || model?.nodes.length || 0;

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
    <div className="tao3k-principles-flow__layout">
      <div className="tao3k-principles-flow__workflow">
        <div className="tao3k-principles-flow__canvas">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeClick={(_, node) => {
              setSelectedId(node.id);
              setPinnedNodeId(node.id);
              onGraphFocusChange?.(node.data.semanticId);
            }}
            nodesDraggable
            nodeDragThreshold={3}
            nodesConnectable={false}
            elementsSelectable
            panOnDrag
            panOnScroll
            panOnScrollMode={PanOnScrollMode.Free}
            panOnScrollSpeed={0.75}
            onlyRenderVisibleElements
            elevateNodesOnSelect={false}
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

            {sourceOpen ? (
              <Panel
                position="top-left"
                className="tao3k-principles-source"
                aria-label="Scheme source code"
              >
                <header>
                  <span>human-capability.ss</span>
                  <button
                    type="button"
                    onClick={() => setSourceOpen(false)}
                    aria-label="Close source code"
                  >
                    Close
                  </button>
                </header>
                {sourceHtml ? (
                  <div
                    className="tao3k-principles-source__highlight"
                    dangerouslySetInnerHTML={{ __html: sourceHtml }}
                  />
                ) : (
                  <p className="tao3k-principles-source__loading">Highlighting Scheme…</p>
                )}
              </Panel>
            ) : null}
          </ReactFlow>
        </div>
        <div className="tao3k-principles-flow__runtime-dock">
          <div className="tao3k-principles-runtime">
            <div>
              <span>WASM CURSOR</span>
              <strong>
                {String(cursor.completedSteps).padStart(2, "0")} /{" "}
                {String(stepCount).padStart(2, "0")}
              </strong>
            </div>
            <button type="button" onClick={toggleRun}>
              {running ? "Pause" : cursor.completedSteps >= stepCount ? "Replay" : "Run"}
            </button>
            <button
              type="button"
              onClick={step}
              disabled={running || cursor.completedSteps >= stepCount}
            >
              Step
            </button>
            <button type="button" onClick={reset}>
              Reset
            </button>
            <button
              type="button"
              className="tao3k-principles-runtime__source"
              aria-expanded={sourceOpen}
              onClick={() => setSourceOpen((value) => !value)}
            >
              {sourceOpen ? "Hide Scheme" : "Source code"}
            </button>
          </div>
        </div>
      </div>

      {inspectorNode ? (
        <aside className="tao3k-principles-inspector">
          <header>
            <span>{pinnedNodeId ? "Pinned inspection" : "Runtime follow"}</span>
            <strong>{executionStateLabel[inspectorNode.data.status]}</strong>
          </header>
          <h3>{inspectorNode.data.title}</h3>
          <p>{inspectorNode.data.summary}</p>
          <dl>
            <div>
              <dt>Human</dt>
              <dd>{inspectorNode.data.human}</dd>
            </div>
            <div>
              <dt>AI</dt>
              <dd>{inspectorNode.data.ai}</dd>
            </div>
            <div>
              <dt>Guard</dt>
              <dd>{inspectorNode.data.guard}</dd>
            </div>
            <div>
              <dt>State</dt>
              <dd>{stateExplanation}</dd>
            </div>
            <div>
              <dt>Topology</dt>
              <dd>{transitionExplanation}</dd>
            </div>
            <div>
              <dt>Pressure test</dt>
              <dd>{inspectorNode.data.pressureDetail}</dd>
            </div>
          </dl>
          <footer>
            <span>{inspectorNode.data.boundary}</span>
            {pinnedNodeId ? (
              <button type="button" onClick={() => setPinnedNodeId(undefined)}>
                Follow run
              </button>
            ) : null}
            <strong>{inspectorNode.data.result}</strong>
          </footer>
        </aside>
      ) : null}
    </div>
  );
}

export function PrinciplesFlow() {
  const [focusedEvidenceId, setFocusedEvidenceId] = useState<string>();
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
          <PrinciplesFlowCanvas
            focusedEvidenceId={focusedEvidenceId}
            onGraphFocusChange={setFocusedEvidenceId}
          />
        </ReactFlowProvider>
      </div>
      <ProofExplorer
        selectedEvidenceId={focusedEvidenceId}
        onSelectEvidence={setFocusedEvidenceId}
      />
    </section>
  );
}
