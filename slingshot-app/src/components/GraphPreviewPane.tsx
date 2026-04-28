import { useMemo } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { FileText } from "lucide-react";
import { markdownToGraph } from "../lib/markdownToGraph";

interface Props {
  markdown: string;
}

function GraphPreview({ markdown }: Props) {
  const { nodes, edges } = useMemo(
    () => markdownToGraph(markdown),
    [markdown],
  );

  if (nodes.length === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[var(--color-bg-main)]">
        <FileText className="h-10 w-10 stroke-[1.5] text-[var(--color-text-disabled)]" />
        <p className="max-w-56 text-center text-sm leading-relaxed text-[var(--color-text-tertiary)]">
          Write your workflow in markdown to see the graph preview
        </p>
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#d9d9d7" gap={20} size={1} />
    </ReactFlow>
  );
}

export default function GraphPreviewPane({ markdown }: Props) {
  return (
    <div className="h-full w-full bg-[var(--color-bg-main)]">
      <ReactFlowProvider>
        <GraphPreview markdown={markdown} />
      </ReactFlowProvider>
    </div>
  );
}
