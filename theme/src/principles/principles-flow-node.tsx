import { Handle, Position, type NodeProps } from "@xyflow/react";
import { memo } from "react";
import type { PrinciplesFlowNode } from "./principles-flow-model";

const statusLabel = {
  waiting: "blocked",
  ready: "eligible",
  running: "checking",
  complete: "admitted",
} as const;

const nodeMark = {
  composition: "∞",
  case: "◇",
  profile: "↗",
} as const;

export const PrinciplesFlowNodeView = memo(function PrinciplesFlowNodeView({
  data,
  selected,
}: NodeProps<PrinciplesFlowNode>) {
  return (
    <article
      className="tao3k-principles-node"
      data-kind={data.kind}
      data-status={statusLabel[data.status]}
      data-selected={selected ? "true" : "false"}
      data-tone={data.tone}
    >
      <Handle type="target" position={Position.Top} className="tao3k-principles-node__handle" />
      <header>
        <span className="tao3k-principles-node__mark" aria-hidden="true">
          {nodeMark[data.kind]}
        </span>
        <strong>{data.kind}</strong>
        <small>{String(data.order).padStart(2, "0")}</small>
      </header>
      <h3>{data.title}</h3>
      <p>{data.summary}</p>
      <footer>
        <span>{data.boundary}</span>
        <b aria-label="Node state">{statusLabel[data.status]}</b>
      </footer>
      <Handle type="source" position={Position.Bottom} className="tao3k-principles-node__handle" />
    </article>
  );
});
