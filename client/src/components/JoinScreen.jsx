import { useState } from "react";

const PRESET_COLORS = [
  "#7c3aed",
  "#2563eb",
  "#059669",
  "#dc2626",
  "#ea580c",
  "#0891b2",
  "#be185d",
  "#4f46e5",
];

const PREVIEW_CLAIMS = {
  3: "#7c3aed",
  8: "#2563eb",
  12: "#059669",
  17: "#dc2626",
  23: "#ea580c",
  29: "#0891b2",
  34: "#be185d",
  41: "#4f46e5",
};

export default function JoinScreen({ onJoin, loading, error }) {
  const [username, setUsername] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    onJoin({ username: username.trim(), color });
  };

  const shouldShowError = hasSubmitted && error;

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      {/* Header */}
      <header className="bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between !px-6 sm:!px-8 lg:!px-12 xl:!px-16">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <GridIcon />
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight text-blue-600">
                ClaimGrid
              </h1>
              <p className="text-xs font-medium text-slate-500">
                Real-time shared board
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm sm:flex">
            900 shared tiles
          </div>
        </div>
      </header>

      {/* Main Login Style Layout */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 !px-6 !py-8 sm:!px-8 lg:min-h-[calc(100vh-64px)] lg:grid-cols-[45fr_55fr] lg:gap-14 lg:!px-12 lg:!py-5 xl:!px-16">
        {/* Left Side - Product Explanation */}
        <div className="max-w-[560px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 !px-4 !py-2 text-sm font-bold text-blue-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Real-time multiplayer grid
          </div>

          <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-[48px]">
            Claim tiles together in real time.
          </h2>

          <p className="mt-4 max-w-[540px] text-base leading-7 text-slate-600 sm:text-lg">
            Join a live multiplayer board, claim tiles, and compete with other
            players instantly.
          </p>

          {/* Info Card */}
          <div className="!mt-7 flex flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white !p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-black leading-none text-slate-950">
                  Live board preview
                </h3>
                <p className="text-sm text-slate-500">
                  Updates instantly for all players
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 !px-3 !py-1 text-xs font-black text-emerald-600 ring-1 ring-emerald-100">
                Live
              </span>
            </div>

            <div className="w-full max-w-[360px] self-center rounded-2xl border border-slate-200 bg-slate-50/70 !p-3">
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 48 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square rounded-md border border-slate-200 bg-white"
                    style={{
                      backgroundColor: PREVIEW_CLAIMS[index] || "#ffffff",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <InfoItem
                icon={<ShieldIcon />}
                title="Conflict-safe claiming"
                description="First come, first claimed tile ownership."
              />
              <InfoItem
                icon={<ActivityIcon />}
                title="Live activity"
                description="Players see updates instantly."
              />
            </div>
          </div>
        </div>

        {/* Right Side - Login Style Join Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="flex w-full max-w-[520px] flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white !p-7 shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:!p-9">
            <div className="flex flex-col gap-2.5">
              <p className="text-xs font-black uppercase tracking-[0.35em] text-blue-600">
                Start Playing
              </p>

              <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Join the board
              </h2>

              <p className="text-base leading-7 text-slate-600">
                Pick a display name and player color. No account is required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="username-input"
                  className="block text-sm font-bold text-slate-700"
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
                  disabled={loading}
                  className="h-[52px] w-full rounded-2xl border border-slate-200 bg-slate-50/60 !px-4 text-base font-medium text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
                />
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4">
                  <label className="text-sm font-bold text-slate-700">
                    Player color
                  </label>

                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white !px-3 !py-1.5 text-xs font-bold uppercase text-slate-500 shadow-sm">
                    <span
                      className="h-3 w-3 rounded-full ring-2 ring-white"
                      style={{ backgroundColor: color }}
                    />
                    {color}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 !p-3">
                  {PRESET_COLORS.map((presetColor) => {
                    const isSelected = color === presetColor;

                    return (
                      <button
                        key={presetColor}
                        type="button"
                        onClick={() => setColor(presetColor)}
                        aria-label={`Select color ${presetColor}`}
                        aria-pressed={isSelected}
                        disabled={loading}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border bg-white transition disabled:cursor-not-allowed disabled:opacity-60 ${isSelected
                            ? "border-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.12)]"
                            : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                          }`}
                      >
                        <span
                          className={`h-6 w-6 rounded-full shadow-sm ${isSelected ? "ring-2 ring-white" : ""
                            }`}
                          style={{ backgroundColor: presetColor }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {shouldShowError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 !px-4 !py-3 text-sm font-semibold text-red-700">
                  {typeof error === "string"
                    ? error
                    : "Something went wrong. Please try again."}
                </div>
              )}

              <button
                id="join-btn"
                type="submit"
                disabled={loading}
                className="flex h-[52px] w-full items-center justify-center rounded-2xl bg-blue-600 !px-5 text-base font-black text-white shadow-[0_16px_34px_rgba(37,99,235,0.26)] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_20px_42px_rgba(37,99,235,0.30)] active:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
              >
                {loading ? "Joining board..." : "Join live board"}
              </button>
            </form>

            <div className="border-t border-slate-100 !pt-5">
              <div className="grid gap-3 sm:grid-cols-3">
                <SmallPoint text="No login required" />
                <SmallPoint text="First come, first claimed" />
                <SmallPoint text="Real-time updates" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white !p-3 shadow-sm">
      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-black leading-snug text-slate-950">
          {title}
        </h4>
        <p className="text-xs leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function SmallPoint({ text }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-slate-50 !px-3 !py-2 text-xs font-bold text-slate-600">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
      {text}
    </div>
  );
}

function GridIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 16 16" fill="currentColor">
      <rect x="2" y="2" width="4" height="4" rx="1.3" />
      <rect x="10" y="2" width="4" height="4" rx="1.3" />
      <rect x="2" y="10" width="4" height="4" rx="1.3" />
      <rect x="10" y="10" width="4" height="4" rx="1.3" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-7" />
    </svg>
  );
}
