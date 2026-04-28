import { useMemo, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Square, Circle } from 'lucide-react';
import { workflows } from '../data/workflows';
import { executionLog } from '../data/executionLog';
import ExecutionGraph from './ExecutionGraph';
import ActivityLog from './ActivityLog';
import { type StepStatus } from '../lib/markdownToGraph';

const statusConfig: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  idle: { label: 'Idle', color: 'text-[var(--color-text-tertiary)]', bg: 'bg-[var(--color-fill-main)]' },
  running: { label: 'Running', color: 'text-[var(--color-accent)]', bg: 'bg-[var(--color-accent-light)]' },
  error: { label: 'Error', color: 'text-[var(--color-fn-error)]', bg: 'bg-[var(--color-fn-error-bg)]' },
  completed: { label: 'Completed', color: 'text-[var(--color-fn-success)]', bg: 'bg-[var(--color-fn-success-bg)]' },
};

export default function WorkflowExecution() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeEntryId, setActiveEntryId] = useState<string | undefined>();

  const workflow = workflows.find((w) => w.id === id);

  const stepStatuses = useMemo<Record<string, StepStatus>>(() => {
    if (!workflow) return {};

    const statuses: Record<string, StepStatus> = {};
    const stepIds = Array.from(new Set(executionLog.map((e) => e.stepId)));
    const stepsWithToolResult = new Set(
      executionLog.filter((e) => e.type === 'tool_result').map((e) => e.stepId),
    );
    const lastActiveStep = stepIds[stepIds.length - 1];

    const stepPattern = /^##\s+Step\s+(\d+):/gm;
    let match: RegExpExecArray | null;
    const allStepIds: string[] = [];
    while ((match = stepPattern.exec(workflow.markdown)) !== null) {
      allStepIds.push(`step-${match[1]}`);
    }

    for (const stepId of allStepIds) {
      if (stepsWithToolResult.has(stepId)) {
        statuses[stepId] = 'completed';
      } else if (stepId === lastActiveStep) {
        statuses[stepId] = 'active';
      } else if (stepIds.includes(stepId)) {
        statuses[stepId] = 'active';
      } else {
        statuses[stepId] = 'pending';
      }
    }

    if (workflow.status === 'error') {
      const last = allStepIds.find((s) => statuses[s] === 'active');
      if (last) statuses[last] = 'error';
    }

    return statuses;
  }, [workflow]);

  const handleNodeClick = useCallback((nodeId: string) => {
    const firstEntry = executionLog.find((e) => e.stepId === nodeId);
    if (firstEntry) {
      setActiveEntryId(firstEntry.id);
    }
  }, []);

  const handleChoiceSelect = useCallback((entryId: string, choice: string) => {
    console.log(`Choice selected for ${entryId}: ${choice}`);
  }, []);

  if (!workflow) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--color-bg-main)]">
        <div className="text-center">
          <p className="text-lg text-[var(--color-text-tertiary)]">Workflow not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 text-sm text-[var(--color-accent)] hover:opacity-80"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const status = statusConfig[workflow.status] ?? statusConfig.idle;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '56px 1fr',
        gridTemplateColumns: '45% 55%',
        height: '100vh',
        width: '100%',
      }}
    >
      {/* Top bar — spans both columns */}
      <div
        className="flex items-center gap-4 border-b border-[var(--color-border-main)] bg-[var(--color-bg-surface)] px-6"
        style={{ gridColumn: '1 / -1' }}
      >
        <button
          onClick={() => navigate('/')}
          className="rounded-lg p-1.5 text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-fill-main)] hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <h1 className="text-sm font-semibold text-[var(--color-text-primary)]">
          {workflow.name}
        </h1>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.bg} ${status.color}`}
        >
          <Circle className="h-2 w-2 fill-current" />
          {status.label}
        </span>

        <div className="flex-1" />

        {workflow.status === 'running' && (
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-fn-error-bg)] px-3 py-1.5 text-sm font-medium text-[var(--color-fn-error)] transition-colors hover:bg-[#f25a5a29]">
            <Square className="h-3.5 w-3.5" />
            Stop
          </button>
        )}
      </div>

      {/* Left pane — Execution Graph */}
      <div className="border-r border-[var(--color-border-main)]" style={{ overflow: 'hidden' }}>
        <ExecutionGraph
          markdown={workflow.markdown}
          stepStatuses={stepStatuses}
          onNodeClick={handleNodeClick}
        />
      </div>

      {/* Right pane — Activity Log */}
      <div style={{ overflow: 'hidden' }}>
        <ActivityLog
          entries={executionLog}
          onChoiceSelect={handleChoiceSelect}
          activeEntryId={activeEntryId}
        />
      </div>
    </div>
  );
}
