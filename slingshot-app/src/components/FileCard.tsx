import { FolderOpen, FileText, Image, Table } from "lucide-react";
import { type KBFile } from "../data/files";

interface Props {
  file: KBFile;
  onOpen: (file: KBFile) => void;
}

function getFileIcon(type: KBFile["type"]) {
  const cls = "w-12 h-12";
  switch (type) {
    case "folder":
      return <FolderOpen className={cls} style={{ color: "#efa201" }} />;
    case "markdown":
      return <FileText className={`${cls} text-[var(--color-text-secondary)]`} />;
    case "pdf":
      return <FileText className={`${cls} text-[var(--color-fn-error)]`} />;
    case "image":
      return <Image className={`${cls} text-[var(--color-fn-success)]`} />;
    case "spreadsheet":
      return <Table className={`${cls} text-[var(--color-fn-success)]`} />;
    default:
      return <FileText className={`${cls} text-[var(--color-text-disabled)]`} />;
  }
}

export default function FileCard({ file, onOpen }: Props) {
  return (
    <button
      onClick={() => onOpen(file)}
      className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--color-border-main)] bg-[var(--color-bg-surface)] p-8 shadow-[0_1px_3px_var(--color-shadow-xs)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_var(--color-shadow-s)] hover:border-[var(--color-border-dark)] cursor-pointer text-center"
    >
      <div className="flex items-center justify-center h-16">
        {getFileIcon(file.type)}
      </div>

      <span className="w-full text-sm font-medium text-[var(--color-text-primary)] truncate">
        {file.name}
      </span>

      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-[var(--color-text-disabled)]">{file.modified}</span>
        {file.type !== "folder" && file.size && (
          <span className="text-xs text-[var(--color-text-disabled)]">{file.size}</span>
        )}
      </div>
    </button>
  );
}
