import { type Node, type Edge } from '@xyflow/react';

export interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

export type StepStatus = 'completed' | 'active' | 'pending' | 'error';

interface ParsedStep {
  index: number;
  title: string;
}

function parseSteps(markdown: string): ParsedStep[] {
  if (!markdown) return [];

  const headingRegex = /^##\s+Step\s+(\d+):\s*(.+)$/gm;
  const steps: ParsedStep[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    steps.push({
      index: parseInt(match[1], 10),
      title: match[2].trim(),
    });
  }

  return steps;
}

const baseNodeStyle: React.CSSProperties = {
  width: 220,
  background: '#ffffff',
  border: '1px solid #0000000f',
  borderRadius: 12,
  padding: '12px 16px',
  fontSize: 13,
  fontWeight: 500,
  color: '#34322d',
  boxShadow: '0 1px 2px #0000000f',
};

const edgeDefaults: Partial<Edge> = {
  type: 'smoothstep',
  animated: false,
  style: { stroke: '#34322d', strokeWidth: 1.5 },
};

export function markdownToGraph(markdown: string): GraphData {
  const steps = parseSteps(markdown);

  if (steps.length === 0) {
    return { nodes: [], edges: [] };
  }

  const nodes: Node[] = steps.map((step, idx) => ({
    id: `step-${step.index}`,
    type: 'default',
    position: { x: 250, y: idx * 150 },
    data: { label: step.title },
    style: { ...baseNodeStyle },
  }));

  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `edge-${nodes[i].id}-${nodes[i + 1].id}`,
      source: nodes[i].id,
      target: nodes[i + 1].id,
      ...edgeDefaults,
    });
  }

  return { nodes, edges };
}

const statusStyles: Record<StepStatus, React.CSSProperties> = {
  completed: {
    border: '1px solid #25ba3b',
    background: '#25ba3b14',
  },
  active: {
    border: '1px solid #0081f2',
    background: '#0081f214',
  },
  pending: {
    border: '1px solid #0000000f',
    background: '#ffffff',
  },
  error: {
    border: '1px solid #f25a5a',
    background: '#f25a5a14',
  },
};

function labelForStatus(title: string, status: StepStatus): string {
  switch (status) {
    case 'completed':
      return `\u2713 ${title}`;
    case 'error':
      return `\u2717 ${title}`;
    default:
      return title;
  }
}

export function markdownToExecutionGraph(
  markdown: string,
  stepStatuses: Record<string, StepStatus>,
): GraphData {
  const steps = parseSteps(markdown);

  if (steps.length === 0) {
    return { nodes: [], edges: [] };
  }

  const nodes: Node[] = steps.map((step, idx) => {
    const nodeId = `step-${step.index}`;
    const status: StepStatus = stepStatuses[nodeId] ?? 'pending';

    return {
      id: nodeId,
      type: 'default',
      position: { x: 250, y: idx * 150 },
      data: { label: labelForStatus(step.title, status) },
      className: status === 'active' ? 'pulse' : undefined,
      style: {
        ...baseNodeStyle,
        ...statusStyles[status],
      },
    };
  });

  const edges: Edge[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.push({
      id: `edge-${nodes[i].id}-${nodes[i + 1].id}`,
      source: nodes[i].id,
      target: nodes[i + 1].id,
      ...edgeDefaults,
    });
  }

  return { nodes, edges };
}
