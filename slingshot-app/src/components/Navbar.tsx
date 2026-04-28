import { useNavigate } from "react-router-dom";
import { GitBranch, FolderOpen, Settings } from "lucide-react";

interface NavbarProps {
  activeTab: "workflows" | "kb";
}

export default function Navbar({ activeTab }: NavbarProps) {
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col items-center w-24 h-screen sticky top-0 bg-[var(--color-bg-surface)] border-r border-[var(--color-border-main)] py-8">
      {/* Logo */}
      <div
        className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-btn-black)] text-white font-bold text-xl cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        S
      </div>

      {/* Tabs */}
      <div className="flex flex-col gap-3 mt-12">
        <button
          title="Workflows"
          onClick={() => navigate("/")}
          className={`p-4 rounded-2xl transition-all duration-200 ${
            activeTab === "workflows"
              ? "bg-[var(--color-btn-black)] text-white"
              : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-fill-main)] hover:text-[var(--color-text-secondary)]"
          }`}
        >
          <GitBranch className="w-6 h-6" />
        </button>
        <button
          title="Knowledge Base"
          onClick={() => navigate("/kb")}
          className={`p-4 rounded-2xl transition-all duration-200 ${
            activeTab === "kb"
              ? "bg-[var(--color-btn-black)] text-white"
              : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-fill-main)] hover:text-[var(--color-text-secondary)]"
          }`}
        >
          <FolderOpen className="w-6 h-6" />
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Settings */}
      <button
        title="Settings"
        className="p-4 rounded-2xl text-[var(--color-text-tertiary)] hover:bg-[var(--color-fill-main)] hover:text-[var(--color-text-secondary)] transition-all duration-200 mb-4"
      >
        <Settings className="w-6 h-6" />
      </button>
    </nav>
  );
}
