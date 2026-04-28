import { useParams, useNavigate } from "react-router-dom";
import { FolderOpen } from "lucide-react";
import { files, type KBFile } from "../data/files";
import FileCard from "./FileCard";
import KBToolbar from "./KBToolbar";

function findFolderById(items: KBFile[], id: string): KBFile | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findFolderById(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

function buildBreadcrumbs(
  items: KBFile[],
  targetId: string,
  trail: { id: string; name: string }[] = []
): { id: string; name: string }[] | null {
  for (const item of items) {
    if (item.id === targetId) {
      return [...trail, { id: item.id, name: item.name }];
    }
    if (item.children) {
      const result = buildBreadcrumbs(
        item.children,
        targetId,
        [...trail, { id: item.id, name: item.name }]
      );
      if (result) return result;
    }
  }
  return null;
}

export default function KnowledgeBase() {
  const { folderId } = useParams<{ folderId?: string }>();
  const navigate = useNavigate();

  let currentFiles: KBFile[];
  let breadcrumbs: { id: string; name: string }[] = [];

  if (folderId) {
    const folder = findFolderById(files, folderId);
    currentFiles = folder?.children ?? [];
    breadcrumbs = buildBreadcrumbs(files, folderId) ?? [];
  } else {
    currentFiles = files;
  }

  const handleNavigate = (id: string | null) => {
    if (id === null) {
      navigate("/kb");
    } else {
      navigate(`/kb/${id}`);
    }
  };

  const handleOpen = (file: KBFile) => {
    if (file.type === "folder") {
      navigate(`/kb/${file.id}`);
    } else if (file.type === "markdown") {
      navigate(`/doc/${file.id}`);
    } else {
      alert("Preview not available for this file type.");
    }
  };

  return (
    <div>
      {!folderId && (
        <h1 className="text-3xl font-semibold text-[var(--color-text-primary)] mb-3">
          Knowledge Base
        </h1>
      )}

      <KBToolbar breadcrumbs={breadcrumbs} onNavigate={handleNavigate} />

      {currentFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32">
          <FolderOpen className="w-16 h-16 mb-4 text-[var(--color-text-disabled)]" />
          <p className="text-base text-[var(--color-text-tertiary)]">This folder is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {currentFiles.map((file) => (
            <FileCard key={file.id} file={file} onOpen={handleOpen} />
          ))}
        </div>
      )}
    </div>
  );
}
