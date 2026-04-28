import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { workflows } from "../data/workflows";
import MarkdownPane from "./MarkdownPane";
import GraphPreviewPane from "./GraphPreviewPane";

export default function WorkflowEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const workflow = workflows.find((w) => w.id === id);
  const isNew = id === "new";

  const [markdown, setMarkdown] = useState(
    isNew ? "" : workflow?.markdown ?? "",
  );

  const name = isNew ? "New Workflow" : workflow?.name ?? "Untitled Workflow";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "56px 1fr",
        gridTemplateColumns: "1fr 1fr",
        height: "100vh",
        width: "100%",
      }}
    >
      {/* Top bar — spans both columns */}
      <div
        className="flex items-center justify-between border-b border-[var(--color-border-main)] bg-[var(--color-bg-surface)] px-6"
        style={{ gridColumn: "1 / -1" }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg p-1.5 text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-fill-main)] hover:text-[var(--color-text-primary)]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {name}
          </h1>
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-btn-black)] px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">
          <Save className="h-4 w-4" />
          Save
        </button>
      </div>

      {/* Left — Monaco editor */}
      <div
        className="border-r border-[var(--color-border-main)] bg-[var(--color-bg-surface)]"
        style={{ overflow: "hidden" }}
      >
        <MarkdownPane value={markdown} onChange={setMarkdown} />
      </div>

      {/* Right — graph preview */}
      <div
        className="bg-[var(--color-bg-main)]"
        style={{ overflow: "hidden" }}
      >
        <GraphPreviewPane markdown={markdown} />
      </div>
    </div>
  );
}
