import { useState } from 'react';
import { Brain, Wrench, CheckCircle, User } from 'lucide-react';
import { type LogEntry } from '../data/executionLog';

interface Props {
  entry: LogEntry;
  onChoiceSelect?: (entryId: string, choice: string) => void;
}

export default function ActivityEntry({ entry, onChoiceSelect }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [textInput, setTextInput] = useState('');

  const TRUNCATE_LENGTH = 200;

  function handleSubmit() {
    const value = textInput || selectedChoice;
    if (value && onChoiceSelect) {
      onChoiceSelect(entry.id, value);
    }
  }

  function renderThinking() {
    return (
      <div
        id={`log-${entry.id}`}
        className="mb-4 rounded-lg border-l-4 border-[var(--color-text-tertiary)] bg-[var(--color-fill-light)] p-5"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Brain className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-text-secondary)]" />
            <p className="text-sm italic text-[var(--color-text-secondary)]">{entry.content}</p>
          </div>
          <span className="ml-4 flex-shrink-0 text-xs text-[var(--color-text-disabled)]">
            {entry.timestamp}
          </span>
        </div>
      </div>
    );
  }

  function renderToolCall() {
    return (
      <div
        id={`log-${entry.id}`}
        className="mb-4 rounded-lg border-l-4 border-[var(--color-accent)] bg-[var(--color-accent-light)] p-5"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Wrench className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-accent)]" />
            <div>
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded bg-[var(--color-accent-light)] px-2 py-0.5 text-xs font-medium text-[var(--color-accent)]">
                  {entry.toolName}
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)]">{entry.content}</p>
              {entry.toolParams && (
                <pre className="mt-2 rounded bg-[var(--color-bg-canvas)] p-2 text-xs text-[var(--color-text-secondary)]">
                  {JSON.stringify(entry.toolParams, null, 2)}
                </pre>
              )}
            </div>
          </div>
          <span className="ml-4 flex-shrink-0 text-xs text-[var(--color-text-disabled)]">
            {entry.timestamp}
          </span>
        </div>
      </div>
    );
  }

  function renderToolResult() {
    const result = entry.toolResult ?? '';
    const isLong = result.length > TRUNCATE_LENGTH;
    const displayText = isLong && !expanded
      ? result.slice(0, TRUNCATE_LENGTH) + '...'
      : result;

    return (
      <div
        id={`log-${entry.id}`}
        className="mb-4 rounded-lg border-l-4 border-[var(--color-fn-success)] bg-[var(--color-fn-success-bg)] p-5"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#25ba3b]" />
            <div>
              <p className="text-sm text-[var(--color-text-secondary)]">{entry.content}</p>
              {result && (
                <pre className="mt-2 whitespace-pre-wrap rounded bg-[var(--color-bg-canvas)] p-2 text-xs text-[var(--color-text-secondary)]">
                  {displayText}
                </pre>
              )}
              {isLong && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="mt-1 text-xs font-medium text-[var(--color-fn-success)] hover:opacity-80"
                >
                  {expanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          </div>
          <span className="ml-4 flex-shrink-0 text-xs text-[var(--color-text-disabled)]">
            {entry.timestamp}
          </span>
        </div>
      </div>
    );
  }

  function renderUserInput() {
    return (
      <div
        id={`log-${entry.id}`}
        className="mb-4 rounded-xl border-l-4 border-[var(--color-text-primary)] bg-[var(--color-bg-surface)] p-5 shadow-[0_1px_3px_var(--color-shadow-s)]"
      >
        <div className="flex items-start justify-between">
          <p className="text-sm font-medium text-[var(--color-text-primary)]">{entry.content}</p>
          <span className="ml-4 flex-shrink-0 text-xs text-[var(--color-text-disabled)]">
            {entry.timestamp}
          </span>
        </div>

        {entry.choices && entry.choices.length > 0 && (
          <div className="mt-3 space-y-2">
            {entry.choices.map((choice) => (
              <label
                key={choice}
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-fill-main)]"
              >
                <input
                  type="radio"
                  name={`choice-${entry.id}`}
                  value={choice}
                  checked={selectedChoice === choice}
                  onChange={(e) => setSelectedChoice(e.target.value)}
                  className="h-4 w-4 accent-[var(--color-btn-black)]"
                />
                {choice}
              </label>
            ))}
          </div>
        )}

        {entry.hasTextInput && (
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Or type a custom response..."
            className="mt-3 w-full rounded-lg border border-[var(--color-border-dark)] px-3 py-2 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:border-[#0000004d] focus:outline-none focus:ring-1 focus:ring-[#0000004d]"
          />
        )}

        <button
          onClick={handleSubmit}
          disabled={!selectedChoice && !textInput}
          className="mt-3 rounded-lg bg-[var(--color-btn-black)] px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Submit
        </button>
      </div>
    );
  }

  function renderUserResponse() {
    return (
      <div
        id={`log-${entry.id}`}
        className="mb-4 rounded-lg border-l-4 border-[var(--color-border-dark)] bg-[var(--color-fill-light)] p-5"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <User className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--color-text-secondary)]" />
            <div>
              <p className="text-sm text-[var(--color-text-secondary)]">{entry.content}</p>
              {entry.selectedChoice && (
                <span className="mt-1 inline-block rounded bg-[var(--color-fill-dark)] px-2 py-0.5 text-xs font-medium text-[var(--color-text-secondary)]">
                  {entry.selectedChoice}
                </span>
              )}
            </div>
          </div>
          <span className="ml-4 flex-shrink-0 text-xs text-[var(--color-text-disabled)]">
            {entry.timestamp}
          </span>
        </div>
      </div>
    );
  }

  switch (entry.type) {
    case 'thinking':
      return renderThinking();
    case 'tool_call':
      return renderToolCall();
    case 'tool_result':
      return renderToolResult();
    case 'user_input':
      return renderUserInput();
    case 'user_response':
      return renderUserResponse();
    default:
      return null;
  }
}
