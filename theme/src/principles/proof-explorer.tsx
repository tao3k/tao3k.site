import {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  type Edge,
  type Node,
  type NodeProps,
  type NodeMouseHandler,
  type NodeTypes,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  createPrinciplesProofExplorerModel,
  type ProofObligation,
  type ProofObligationState,
  type ProofReceipt,
  type ProofRuntimeSnapshot,
} from "./proof-explorer-model";
import "./proof-explorer.css";

const stateLabel: Record<ProofObligationState, string> = {
  pending: "Pending",
  checking: "Checking",
  proved: "Proved",
  failed: "Failed",
  "witness-required": "Witness required",
  "authority-required": "Authority required",
};

const stateTone: Record<ProofObligationState, string> = {
  pending: "neutral",
  checking: "active",
  proved: "proved",
  failed: "failed",
  "witness-required": "witness",
  "authority-required": "authority",
};

const receiptLabel: Record<ProofReceipt["finalStatus"], string> = {
  admissible: "Admissible",
  blocked: "Blocked",
  "needs-human-authority": "Needs human authority",
};

type ProofFlowNodeData = {
  readonly kind: "obligation" | "receipt";
  readonly obligationId?: string;
  readonly graphId?: string;
  readonly order: string;
  readonly label: string;
  readonly formula?: string;
  readonly subtitle: string;
  readonly state: string;
} & Record<string, unknown>;

type ProofFlowNode = Node<ProofFlowNodeData, "proof">;
type ProofFlowEdge = Edge<Readonly<{ state: string }>>;

const proofFlowNodeTypes: NodeTypes = { proof: ProofFlowNodeView };

export function ProofExplorer({
  onSelectEvidence,
  selectedEvidenceId,
}: {
  onSelectEvidence?: (graphId: string) => void;
  selectedEvidenceId?: string;
}): ReactNode {
  const [runtime, setRuntime] = useState<ProofRuntimeSnapshot>({
    completedSteps: 0,
    running: false,
    stepCount: 6,
  });
  const model = useMemo(() => createPrinciplesProofExplorerModel(runtime), [runtime]);
  const [selectedId, setSelectedId] = useState(model.obligations[0]?.id ?? "");
  const selected =
    model.obligations.find((obligation) => obligation.id === selectedId) ?? model.obligations[0];

  const stepVerifier = useCallback(() => {
    setRuntime((current) => {
      const completedSteps = Math.min(current.completedSteps + 1, current.stepCount);
      return {
        ...current,
        completedSteps,
        running: completedSteps < current.stepCount && current.running,
      };
    });
  }, []);

  useEffect(() => {
    if (!runtime.running) return;
    const interval = window.setInterval(stepVerifier, 760);
    return () => window.clearInterval(interval);
  }, [runtime.running, stepVerifier]);

  useEffect(() => {
    const active =
      model.obligations.find(({ state }) => state === "checking") ??
      model.obligations.find(
        ({ verificationOrder }) => verificationOrder === runtime.completedSteps + 1,
      ) ??
      model.obligations.find(
        ({ verificationOrder }) => verificationOrder === runtime.completedSteps,
      ) ??
      model.obligations.at(-1);
    if (active) setSelectedId(active.id);
  }, [model, runtime.completedSteps, runtime.running]);

  useEffect(() => {
    if (runtime.running) return;
    if (!selectedEvidenceId) return;
    const obligation = model.obligations.find(({ evidence }) =>
      evidence.some(({ graphId }) => graphId === selectedEvidenceId),
    );
    if (obligation) setSelectedId(obligation.id);
  }, [model, runtime.running, selectedEvidenceId]);

  return (
    <section className="proof-explorer" aria-label="Interactive proof explorer">
      <div className="proof-explorer__header">
        <p className="proof-explorer__eyebrow">Lean verification figure</p>
        <h2>Execution is not authority until the trace can explain itself.</h2>
        <p>
          This verifier has its own cursor: run it independently from the workflow canvas, inspect
          the Lean proposition for each obligation, and use graph evidence only when you want to
          focus the topology above.
        </p>
      </div>

      <ReactFlowProvider>
        <ProofFlowGraph
          model={model}
          onSelectEvidence={onSelectEvidence}
          onSelectObligation={setSelectedId}
          selectedId={selected?.id}
        />
      </ReactFlowProvider>

      <div className="proof-wave-bridge">
        <div className="proof-wave-bridge__plan" aria-hidden="true">
          <span>Proof plan</span>
          <strong>↓</strong>
        </div>
        <div
          className="proof-explorer__runtime"
          data-running={runtime.running ? "true" : "false"}
          aria-label="Proof plan execution controls"
        >
          <div className="proof-explorer__runtime-telemetry">
            <span>WASM cursor</span>
            <strong>
              {String(runtime.completedSteps).padStart(2, "0")} /{" "}
              {String(runtime.stepCount).padStart(2, "0")}
            </strong>
            <em>{runtime.running ? "checking" : "stable"}</em>
          </div>
          <div className="proof-explorer__runtime-actions">
            <button
              className="proof-explorer__runtime-action proof-explorer__runtime-action--primary"
              type="button"
              onClick={() =>
                setRuntime((current) =>
                  current.completedSteps >= current.stepCount
                    ? { ...current, completedSteps: 0, running: true }
                    : { ...current, running: !current.running },
                )
              }
            >
              {runtime.running
                ? "Pause proof"
                : runtime.completedSteps >= runtime.stepCount
                  ? "Replay proof"
                  : "Run proof"}
            </button>
            <button
              className="proof-explorer__runtime-action proof-explorer__runtime-action--secondary"
              type="button"
              disabled={runtime.running || runtime.completedSteps >= runtime.stepCount}
              onClick={stepVerifier}
            >
              Step
            </button>
            <button
              className="proof-explorer__runtime-action proof-explorer__runtime-action--reset"
              type="button"
              onClick={() =>
                setRuntime((current) => ({ ...current, completedSteps: 0, running: false }))
              }
            >
              Reset
            </button>
          </div>
        </div>
        <em>Mathematical Wave</em>
      </div>

      {selected ? <ProofMathBoard selected={selected} /> : null}

      <div className="proof-explorer__grid">
        {selected ? <ProofDetail obligation={selected} /> : null}
        <ProofEvidenceMap
          obligations={model.obligations}
          onSelectEvidence={onSelectEvidence}
          onSelectObligation={setSelectedId}
          selectedEvidenceId={selectedEvidenceId}
        />
        <ProofReceiptPanel receipt={model.receipt} />
      </div>
    </section>
  );
}

function ProofFlowGraph({
  model,
  onSelectEvidence,
  onSelectObligation,
  selectedId,
}: {
  model: ReturnType<typeof createPrinciplesProofExplorerModel>;
  onSelectEvidence?: (graphId: string) => void;
  onSelectObligation: (id: string) => void;
  selectedId?: string;
}): ReactNode {
  const nodes = useMemo<ProofFlowNode[]>(
    () => [
      ...model.obligations.map((obligation, index): ProofFlowNode => {
        const evidence = obligation.evidence[0];
        const column = index % 3;
        const row = Math.floor(index / 3);
        return {
          id: obligation.id,
          type: "proof",
          position: {
            x: column * 330,
            y: row * 190 + (column === 1 ? 34 : 0),
          },
          className: "proof-flow-node",
          data: {
            kind: "obligation",
            obligationId: obligation.id,
            graphId: evidence?.graphId,
            order: String(obligation.verificationOrder).padStart(2, "0"),
            label: obligation.title,
            formula: obligation.symbol,
            subtitle: obligation.className,
            state: stateTone[obligation.state],
          },
          selected: obligation.id === selectedId,
        };
      }),
      {
        id: "proof-receipt",
        type: "proof",
        position: { x: 990, y: 116 },
        className: "proof-flow-node proof-flow-node--receipt",
        data: {
          kind: "receipt",
          order: "Σ",
          label: receiptLabel[model.receipt.finalStatus],
          formula: "Γ ⊢ admissible?",
          subtitle: model.receipt.traceDigest,
          state: model.receipt.finalStatus === "admissible" ? "proved" : "witness",
        },
      },
    ],
    [model, selectedId],
  );

  const edges = useMemo<ProofFlowEdge[]>(() => {
    const checkingOrder = model.obligations.find(
      ({ state }) => state === "checking",
    )?.verificationOrder;
    return [
      ...model.obligations.slice(0, -1).map((obligation, index): ProofFlowEdge => {
        const target = model.obligations[index + 1];
        const edgeTouchesChecking =
          checkingOrder === obligation.verificationOrder ||
          checkingOrder === target.verificationOrder;
        const state = edgeTouchesChecking
          ? "active"
          : obligation.state === "proved" ||
              obligation.state === "authority-required" ||
              obligation.state === "witness-required"
            ? "proved"
            : "neutral";
        return {
          id: `${obligation.id}-${target.id}`,
          source: obligation.id,
          target: target.id,
          type: "smoothstep",
          animated: state === "active",
          className: `proof-flow-edge proof-flow-edge--${state}`,
          data: { state },
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: state === "active" || state === "proved" ? "#86efac" : "#4c6964",
            width: 18,
            height: 18,
          },
        };
      }),
      {
        id: "admissible-action-proof-receipt",
        source: "admissible-action",
        target: "proof-receipt",
        type: "smoothstep",
        animated: checkingOrder === model.obligations.at(-1)?.verificationOrder,
        className: `proof-flow-edge proof-flow-edge--${
          checkingOrder === model.obligations.at(-1)?.verificationOrder ? "active" : "neutral"
        }`,
        data: { state: model.receipt.finalStatus },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color:
            checkingOrder === model.obligations.at(-1)?.verificationOrder ? "#86efac" : "#4c6964",
          width: 18,
          height: 18,
        },
      },
    ];
  }, [model]);

  const handleNodeClick: NodeMouseHandler<ProofFlowNode> = useCallback(
    (_, node) => {
      if (node.data.obligationId) onSelectObligation(node.data.obligationId);
      if (node.data.graphId) onSelectEvidence?.(node.data.graphId);
    },
    [onSelectEvidence, onSelectObligation],
  );

  return (
    <div className="proof-flow-shell" aria-label="Lean proof obligation graph">
      <div className="proof-flow-shell__label">Proof plan</div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={proofFlowNodeTypes}
        onNodeClick={handleNodeClick}
        nodesConnectable={false}
        nodesDraggable
        elementsSelectable
        onlyRenderVisibleElements
        fitView
        fitViewOptions={{ padding: 0.2, maxZoom: 1.04 }}
        minZoom={0.62}
        maxZoom={1.18}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={26} size={1} />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}

function ProofFlowNodeView({ data, selected }: NodeProps<ProofFlowNode>): ReactNode {
  return (
    <article
      className="proof-flow-card"
      data-kind={data.kind}
      data-state={data.state}
      data-selected={selected ? "true" : "false"}
    >
      <Handle type="target" position={Position.Left} className="proof-flow-card__handle" />
      <span className="proof-flow-card__order">{data.order}</span>
      <div>
        <strong>{data.label}</strong>
        {data.formula ? <code>{data.formula}</code> : null}
        <small>{data.subtitle}</small>
      </div>
      <em>{data.state}</em>
      <Handle type="source" position={Position.Right} className="proof-flow-card__handle" />
    </article>
  );
}

function ProofMathBoard({ selected }: { selected: ProofObligation }): ReactNode {
  return (
    <div className="proof-math-board" aria-label="Formal verification math board">
      <section className="proof-math-board__selected" data-state={stateTone[selected.state]}>
        <p className="proof-explorer__eyebrow">Mathematical Wave</p>
        <h3>{selected.symbol}</h3>
        <pre>
          <code>{selected.formula}</code>
        </pre>
        <div className="proof-wave-stack" aria-label="Mathematical wave detection layers">
          <article>
            <span>01 formula</span>
            <p>{selected.intuition}</p>
          </article>
          <article data-active="true">
            <span>02 detected</span>
            <p>{selected.finding}</p>
          </article>
          <article>
            <span>03 audit output</span>
            <p>{selected.agentAction}</p>
          </article>
        </div>
      </section>
      <aside className="proof-review-panel" aria-label="Formal verification review">
        <p className="proof-explorer__eyebrow">Review</p>
        <h3>Detected issue for agent and user review</h3>
        <p>{selected.finding}</p>
        <ul>
          <li>
            <strong>Potential production risk</strong>
            <span>{selected.productionRisk}</span>
          </li>
          <li>
            <strong>Agent repair action</strong>
            <span>{selected.agentAction}</span>
          </li>
          <li>
            <strong>User audit action</strong>
            <span>{selected.userAudit}</span>
          </li>
        </ul>
      </aside>
    </div>
  );
}

function ProofDetail({ obligation }: { obligation: ProofObligation }): ReactNode {
  return (
    <article className="proof-explorer__detail" data-state={stateTone[obligation.state]}>
      <p className="proof-explorer__eyebrow">Selected proof</p>
      <h3>{obligation.title}</h3>
      <dl>
        <div>
          <dt>Claim</dt>
          <dd>{obligation.claim}</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{obligation.source}</dd>
        </div>
        <div>
          <dt>Rule</dt>
          <dd>
            <code>{obligation.rule}</code>
          </dd>
        </div>
        <div>
          <dt>Formula</dt>
          <dd>
            <pre className="proof-formula-source">
              <code>{obligation.formula}</code>
            </pre>
          </dd>
        </div>
        <div>
          <dt>Intuition</dt>
          <dd>{obligation.intuition}</dd>
        </div>
        <div>
          <dt>Lean</dt>
          <dd>
            <pre className="proof-lean-source">
              <code>{obligation.lean}</code>
            </pre>
          </dd>
        </div>
        <div>
          <dt>Evidence</dt>
          <dd>
            {obligation.evidence.map((evidence) => (
              <span className="proof-evidence-chip" key={`${evidence.kind}-${evidence.graphId}`}>
                {evidence.kind}:{evidence.label}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt>Result</dt>
          <dd>{stateLabel[obligation.state]}</dd>
        </div>
      </dl>
      <p>{obligation.detail}</p>
    </article>
  );
}

function ProofEvidenceMap({
  obligations,
  onSelectEvidence,
  onSelectObligation,
  selectedEvidenceId,
}: {
  obligations: readonly ProofObligation[];
  onSelectEvidence?: (graphId: string) => void;
  onSelectObligation?: (obligationId: string) => void;
  selectedEvidenceId?: string;
}): ReactNode {
  const evidence = obligations.flatMap((obligation) =>
    obligation.evidence.map((item) => ({
      ...item,
      obligationId: obligation.id,
      state: obligation.state,
    })),
  );
  return (
    <aside className="proof-explorer__evidence-map" aria-label="Graph evidence map">
      <p className="proof-explorer__eyebrow">Graph evidence</p>
      <h3>Click proof, focus graph.</h3>
      <div className="proof-evidence-map__items">
        {evidence.map((item) => (
          <button
            type="button"
            key={`${item.obligationId}-${item.graphId}`}
            data-state={stateTone[item.state]}
            data-selected={item.graphId === selectedEvidenceId ? "true" : "false"}
            onClick={() => {
              onSelectObligation?.(item.obligationId);
              onSelectEvidence?.(item.graphId);
            }}
          >
            <span>{item.kind}</span>
            <strong>{item.label}</strong>
            <small>{item.graphId}</small>
          </button>
        ))}
      </div>
    </aside>
  );
}

function ProofReceiptPanel({ receipt }: { receipt: ProofReceipt }): ReactNode {
  return (
    <aside className="proof-explorer__receipt" aria-label="Admissible action receipt">
      <p className="proof-explorer__eyebrow">Receipt</p>
      <h3>{receiptLabel[receipt.finalStatus]}</h3>
      <dl>
        <div>
          <dt>Schema</dt>
          <dd>{receipt.schema}</dd>
        </div>
        <div>
          <dt>Workflow</dt>
          <dd>{receipt.workflowId}</dd>
        </div>
        <div>
          <dt>Trace digest</dt>
          <dd>{receipt.traceDigest}</dd>
        </div>
      </dl>
      <div className="proof-receipt-metrics" aria-label="Proof receipt metrics">
        <span>
          <strong>{receipt.provedCount}</strong>
          proved
        </span>
        <span>
          <strong>{receipt.failedCount}</strong>
          failed
        </span>
        <span>
          <strong>{receipt.witnessRequiredCount}</strong>
          witness
        </span>
        <span>
          <strong>{receipt.authorityRequiredCount}</strong>
          authority
        </span>
      </div>
    </aside>
  );
}
