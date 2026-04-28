import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  type NodeMouseHandler,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { markdownToExecutionGraph, type StepStatus } from '../lib/markdownToGraph';

interface Props {
  markdown: string;
  stepStatuses: Record<string, StepStatus>;
  onNodeClick?: (nodeId: string) => void;
}

function ExecutionGraphInner({ markdown, stepStatuses, onNodeClick }: Props) {
  const { nodes, edges } = useMemo(
    () => markdownToExecutionGraph(markdown, stepStatuses),
    [markdown, stepStatuses],
  );

  const handleNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      onNodeClick?.(node.id);
    },
    [onNodeClick],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodeClick={handleNodeClick}
      fitView
      nodesDraggable={false}
      nodesConnectable={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background color="#d9d9d7" gap={20} size={1} />
    </ReactFlow>
  );
}

export default function ExecutionGraph(props: Props) {
  return (
    <ReactFlowProvider>
      <ExecutionGraphInner {...props} />
    </ReactFlowProvider>
  );
}
