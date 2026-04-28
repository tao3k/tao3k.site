import { useNavigate } from "react-router-dom";
import { Play, Pencil } from "lucide-react";
import { type Workflow } from "../data/workflows";

interface Props {
  workflow: Workflow;
}

const statusConfig = {
  idle: { dot: "bg-[#b9b9b7]", label: "Idle", pulse: false },
  running: { dot: "bg-[var(--color-fn-success)]", label: "Running", pulse: true },
  error: { dot: "bg-[var(--color-fn-error)]", label: "Error", pulse: false },
  completed: { dot: "bg-[var(--color-accent)]", label: "Completed", pulse: false },
} as const;

export default function WorkflowCard({ workflow }: Props) {
  const navigate = useNavigate();
  const status = statusConfig[workflow.status];

  return (
    <div className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] p-8 shadow-[0_1px_3px_var(--color-shadow-xs),0_4px_12px_var(--color-shadow-xs)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_var(--color-shadow-s),0_8px_24px_var(--color-shadow-xs)]">
      <div>
        {/* Status badge */}
        <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-fill-main)] px-3 py-1 text-sm font-medium text-[var(--color-text-secondary)]">
          <span className="relative flex h-2.5 w-2.5">
            {status.pulse && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-fn-success)] opacity-75" />
            )}
            <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${status.dot}`} />
          </span>
          {status.label}
        </span>

        {/* Name & description */}
        <h3 className="mt-5 text-base font-semibold text-[var(--color-text-primary)]">
          {workflow.name}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-text-tertiary)]">
          {workflow.description}
        </p>

        {/* Meta */}
        <p className="mt-4 text-sm text-[var(--color-text-disabled)]">
          {workflow.stepCount} steps &middot; {workflow.lastRun}
        </p>
      </div>

      {/* Actions */}
      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={() => navigate(`/workflow/${workflow.id}/run`)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-btn-black)] px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
        >
          <Play className="h-4 w-4" />
          Open
        </button>
        <button
          onClick={() => navigate(`/workflow/${workflow.id}/edit`)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--color-border-dark)] px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] transition-all duration-200 hover:bg-[var(--color-fill-main)]"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </button>
      </div>
    </div>
  );
}
