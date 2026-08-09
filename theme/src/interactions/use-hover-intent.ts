import { useCallback, useEffect, useRef } from "react";

export type HoverIntentControls<Value> = Readonly<{
  cancel: () => void;
  commit: (value: Value) => void;
  schedule: (value: Value) => void;
}>;

export function useHoverIntent<Value>(
  initialValue: Value,
  onCommit: (value: Value) => void,
  delay = 120,
): HoverIntentControls<Value> {
  const committed = useRef(initialValue);
  const candidate = useRef(initialValue);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onCommitRef = useRef(onCommit);

  useEffect(() => {
    onCommitRef.current = onCommit;
  }, [onCommit]);

  const cancel = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const commit = useCallback(
    (value: Value) => {
      cancel();
      candidate.current = value;
      committed.current = value;
      onCommitRef.current(value);
    },
    [cancel],
  );

  const schedule = useCallback(
    (value: Value) => {
      if (Object.is(committed.current, value)) {
        cancel();
        candidate.current = value;
        return;
      }
      if (timer.current !== null && Object.is(candidate.current, value)) return;

      cancel();
      candidate.current = value;
      timer.current = setTimeout(() => {
        timer.current = null;
        committed.current = value;
        onCommitRef.current(value);
      }, delay);
    },
    [cancel, delay],
  );

  useEffect(() => cancel, [cancel]);

  return { cancel, commit, schedule };
}
