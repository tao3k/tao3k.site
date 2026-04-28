import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";
import { files, type KBFile } from "../data/files";

function findFileById(tree: KBFile[], id: string): KBFile | null {
  for (const file of tree) {
    if (file.id === id) return file;
    if (file.children) {
      const found = findFileById(file.children, id);
      if (found) return found;
    }
  }
  return null;
}

export default function DocumentEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const file = id ? findFileById(files, id) : null;

  const [title, setTitle] = useState(file?.name ?? "");
  const [content, setContent] = useState(file?.content ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, window.innerHeight * 0.6)}px`;
    }
  }, [content]);

  if (!file) {
    return (
      <div
        className="flex flex-col items-center justify-center bg-[var(--color-bg-surface)]"
        style={{ height: "100vh", width: "100%" }}
      >
        <FileText className="mb-4 h-12 w-12 text-[var(--color-text-disabled)]" />
        <h2 className="mb-2 text-lg font-medium text-[var(--color-text-primary)]">
          Document not found
        </h2>
        <p className="mb-6 text-sm text-[var(--color-text-tertiary)]">
          The document you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/kb"
          className="text-sm font-medium text-[var(--color-accent)] hover:opacity-80"
        >
          &larr; Back to Knowledge Base
        </Link>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col bg-[var(--color-bg-surface)]"
      style={{ height: "100vh", width: "100%" }}
    >
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center border-b border-[var(--color-border-main)] px-6">
        <button
          onClick={() => navigate("/kb")}
          className="mr-4 rounded-lg p-1.5 text-[var(--color-text-tertiary)] hover:bg-[var(--color-fill-main)] hover:text-[var(--color-text-secondary)]"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[var(--color-text-disabled)]" />
          <span className="text-sm font-medium text-[var(--color-text-secondary)]">
            {title || file.name}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-6 text-xs text-[var(--color-text-disabled)]">
          <span>Last modified: {file.modified}</span>
          {file.size && <span>{file.size}</span>}
        </div>
      </div>

      {/* Editor area */}
      <div className="w-full flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-8 pt-16 pb-32">
          {/* Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            className="mb-6 w-full border-none bg-transparent text-4xl font-bold text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-disabled)]"
          />

          {/* Content */}
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            className="w-full resize-none border-none bg-transparent text-base leading-relaxed text-[var(--color-text-secondary)] outline-none placeholder:text-[var(--color-text-disabled)]"
            style={{ minHeight: "60vh" }}
          />
        </div>
      </div>
    </div>
  );
}
