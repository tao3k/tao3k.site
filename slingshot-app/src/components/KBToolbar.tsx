import { Upload, FolderPlus, ChevronRight } from "lucide-react";

interface Props {
  breadcrumbs: { id: string; name: string }[];
  onNavigate: (id: string | null) => void;
}

export default function KBToolbar({ breadcrumbs, onNavigate }: Props) {
  return (
    <div className="flex items-center justify-between mb-10">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm">
        <button
          onClick={() => onNavigate(null)}
          className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors font-medium"
        >
          Knowledge Base
        </button>

        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.id} className="flex items-center gap-1.5">
            <ChevronRight className="w-4 h-4 text-[var(--color-text-disabled)]" />
            {i === breadcrumbs.length - 1 ? (
              <span className="text-[var(--color-text-primary)] font-medium">
                {crumb.name}
              </span>
            ) : (
              <button
                onClick={() => onNavigate(crumb.id)}
                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors font-medium"
              >
                {crumb.name}
              </button>
            )}
          </span>
        ))}
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] border border-[var(--color-border-dark)] rounded-xl hover:bg-[var(--color-fill-main)] transition-colors">
          <Upload className="w-5 h-5" />
          Upload
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] border border-[var(--color-border-dark)] rounded-xl hover:bg-[var(--color-fill-main)] transition-colors">
          <FolderPlus className="w-5 h-5" />
          New Folder
        </button>
      </div>
    </div>
  );
}
