import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { workflows } from "../data/workflows";
import WorkflowCard from "./WorkflowCard";

export default function WorkflowGrid() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Page header */}
      <div className="mb-12 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)]">Workflows</h1>
        <button
          onClick={() => navigate("/workflow/new/edit")}
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-btn-black)] px-5 py-3 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
        >
          <Plus className="h-5 w-5" />
          New Workflow
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {workflows.map((wf) => (
          <WorkflowCard key={wf.id} workflow={wf} />
        ))}

        {/* New Workflow ghost card */}
        <button
          onClick={() => navigate("/workflow/new/edit")}
          className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-[var(--color-border-dark)] bg-[var(--color-bg-surface)] p-8 text-[var(--color-text-disabled)] transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          <Plus className="h-10 w-10" />
          <span className="text-sm font-medium">New Workflow</span>
        </button>
      </div>
    </div>
  );
}
