import { useEffect, useState, useCallback } from "react";

let nextId = 0;

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDone={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDone }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setLeaving(true), toast.duration - 300);
    const doneTimer = setTimeout(onDone, toast.duration);
    return () => { clearTimeout(hideTimer); clearTimeout(doneTimer); };
  }, []);

  const colors = {
    error:   "bg-red-500/15 border-red-500/40 text-red-300",
    success: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
    info:    "bg-violet-500/15 border-violet-500/40 text-violet-300",
  };

  const icons = {
    error:   "✕",
    success: "✓",
    info:    "ℹ",
  };

  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border
        text-sm font-medium shadow-xl max-w-xs
        ${colors[toast.type] || colors.info}
        ${leaving ? "toast-out" : "toast-in"}`}
    >
      <span className="text-base leading-none">{icons[toast.type] || "ℹ"}</span>
      <span>{toast.message}</span>
    </div>
  );
}

// ── useToast hook (exported separately for use in parent) ──────────
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = ++nextId;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
