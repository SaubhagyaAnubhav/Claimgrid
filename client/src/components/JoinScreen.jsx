import { useState } from "react";

const PRESET_COLORS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#14b8a6", "#3b82f6", "#8b5cf6", "#ec4899",
  "#06b6d4", "#f43f5e", "#a855f7", "#10b981",
];

export default function JoinScreen({ onJoin, loading, error }) {
  const [username, setUsername] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onJoin({ username: username.trim(), color });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4"
      style={{
        backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 70%)"
      }}
    >
      <div className="w-full max-w-[420px]">

        {/* ── Card ─────────────────────────────────────────── */}
        <div className="bg-slate-900 border border-white/8 rounded-2xl p-8 shadow-xl shadow-black/40">

          {/* ── Brand ───────────────────────────────────────── */}
          <div className="flex items-center gap-3 mb-8">
            {/* Small 4-square icon */}
            <div className="w-8 h-8 rounded-lg bg-violet-600/15 border border-violet-500/25 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-violet-400" fill="currentColor" viewBox="0 0 16 16">
                <rect x="1" y="1" width="6" height="6" rx="1" />
                <rect x="9" y="1" width="6" height="6" rx="1" />
                <rect x="1" y="9" width="6" height="6" rx="1" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-semibold text-white leading-none">
                Claim<span className="text-violet-400">Grid</span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Capture territory in real time.</p>
            </div>
          </div>

          {/* ── Form ─────────────────────────────────────────── */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div className="space-y-1.5">
              <label
                htmlFor="username-input"
                className="block text-sm font-medium text-slate-300"
              >
                Display name
              </label>
              <input
                id="username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Leave blank for random name"
                maxLength={24}
                autoComplete="off"
                className="w-full h-10 bg-slate-800 border border-white/10 rounded-lg px-3
                  text-sm text-white placeholder-slate-500
                  outline-none ring-0
                  focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20
                  transition-colors duration-150"
              />
            </div>

            {/* Color picker */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-300">
                Choose your color
              </label>

              {/* Color grid */}
              <div className="grid grid-cols-6 gap-2">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className="w-full aspect-square rounded-lg transition-all duration-100"
                    style={{
                      backgroundColor: c,
                      outline: color === c ? `2px solid ${c}` : "2px solid transparent",
                      outlineOffset: "2px",
                      opacity: color === c ? 1 : 0.55,
                    }}
                    title={c}
                    aria-label={`Select color ${c}`}
                  />
                ))}
              </div>

              {/* Selected indicator — small and inline */}
              <div className="flex items-center gap-2 pt-0.5">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-xs text-slate-500">Selected color</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-400 bg-red-400/8 border border-red-400/15 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              id="join-btn"
              type="submit"
              disabled={loading}
              className="w-full h-10 rounded-lg bg-violet-600 hover:bg-violet-500
                text-white text-sm font-medium
                disabled:opacity-40 disabled:cursor-not-allowed
                transition-colors duration-150"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Joining…
                </span>
              ) : "Enter the Grid"}
            </button>
          </form>
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <p className="text-center text-xs text-slate-600 mt-5">
          No account needed · 900 tiles · First come, first claimed
        </p>
      </div>
    </div>
  );
}
