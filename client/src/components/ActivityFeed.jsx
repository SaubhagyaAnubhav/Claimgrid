// Helper: "just now" vs local time
function formatTime(createdAt) {
  if (!createdAt) return "";
  const diff = Date.now() - new Date(createdAt).getTime();
  if (diff < 10000) return "just now";
  return new Date(createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Icons per event type
function EventIcon({ type }) {
  if (type === "join") {
    return (
      <svg className="w-3 h-3 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    );
  }
  if (type === "claim") {
    return (
      <svg className="w-3 h-3 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    );
  }
  return null;
}

export default function ActivityFeed({ activity }) {
  const MAX = 20;
  const capped = activity.slice(0, MAX);

  return (
    <div className="flex flex-col h-full glass rounded-2xl overflow-hidden">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <h3 className="text-xs font-semibold text-white uppercase tracking-widest">Live Activity</h3>
        </div>
        {activity.length > 0 && (
          <span className="text-[10px] text-slate-500 tabular-nums">
            {Math.min(activity.length, MAX)} events
          </span>
        )}
      </div>

      {/* ── Feed ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {capped.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              No activity yet.<br />Capture a tile to start the game.
            </p>
          </div>
        ) : (
          capped.map((evt, i) => (
            <div
              key={evt.id ?? `${evt.createdAt}-${i}`}
              className="activity-in group flex items-start gap-2.5 px-3 py-2.5 rounded-xl
                hover:bg-white/5 transition-colors duration-150 cursor-default"
            >
              {/* Color dot + type icon stacked */}
              <div className="flex flex-col items-center gap-1 flex-shrink-0 mt-0.5">
                <span
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-black/20"
                  style={{ backgroundColor: evt.userColor || evt.color || "#6b7280" }}
                />
                <EventIcon type={evt.type} />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-300 leading-snug">
                  {evt.type === "join" ? (
                    <>
                      <span className="font-semibold text-emerald-300">{evt.username}</span>
                      <span className="text-slate-400"> joined the board</span>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-white">{evt.username}</span>
                      <span className="text-slate-400"> captured </span>
                      <span className="font-mono text-violet-400">#{evt.tileId}</span>
                    </>
                  )}
                </p>
                <p className="text-[10px] text-slate-600 mt-0.5">
                  {formatTime(evt.createdAt || evt.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
