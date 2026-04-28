import { useEffect, useRef } from 'react';
import { type LogEntry } from '../data/executionLog';
import ActivityEntry from './ActivityEntry';

interface Props {
  entries: LogEntry[];
  onChoiceSelect?: (entryId: string, choice: string) => void;
  activeEntryId?: string;
}

export default function ActivityLog({ entries, onChoiceSelect, activeEntryId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!activeEntryId) return;
    const el = document.getElementById(`log-${activeEntryId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeEntryId]);

  const lastEntry = entries.length > 0 ? entries[entries.length - 1] : null;
  const isWaitingForInput =
    lastEntry?.type === 'user_input' &&
    !entries.some(
      (e) =>
        e.type === 'user_response' &&
        e.stepId === lastEntry.stepId &&
        entries.indexOf(e) > entries.indexOf(lastEntry),
    );

  return (
    <div className="flex h-full flex-col bg-[var(--color-bg-main)]">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border-main)] px-6 py-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-fn-success)] opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-fn-success)]" />
        </span>
        <h2 className="text-sm font-semibold text-[var(--color-text-primary)]">Agent Activity</h2>
        <span className="ml-auto text-xs text-[var(--color-text-disabled)]">
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      {/* Scrollable log */}
      <div ref={containerRef} className="flex-1 overflow-y-auto p-6">
        {entries.map((entry) => (
          <ActivityEntry
            key={entry.id}
            entry={entry}
            onChoiceSelect={onChoiceSelect}
          />
        ))}

        {/* Waiting indicator */}
        {isWaitingForInput && (
          <div className="flex items-center gap-2 rounded-lg bg-[var(--color-fill-light)] px-4 py-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-text-tertiary)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-text-tertiary)]" />
            </span>
            <span className="animate-pulse text-sm text-[var(--color-text-tertiary)]">
              Waiting for input...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
