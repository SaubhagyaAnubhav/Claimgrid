import { useGrid }       from "../hooks/useGrid";
import { useSocket }     from "../hooks/useSocket";
import GridBoard         from "./GridBoard";
import Leaderboard       from "./Leaderboard";
import StatsPanel        from "./StatsPanel";
import ActivityFeed      from "./ActivityFeed";
import OnlineUsers       from "./OnlineUsers";

export default function Dashboard({ user, onLeave, addToast }) {
  const {
    tiles, loading, recentTile,
    leaderboard, activity, onlineCount,
    claimTile,
  } = useGrid(user, addToast);

  // Connect socket and let useGrid handle all socket events
  useSocket(user?.userId, {});

  const myTiles = tiles.filter((t) => t.ownerId === user?.userId).length;

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      {/* ── Top Nav ───────────────────────────────────────────────── */}
      <header className="border-b border-white/5 px-6 py-3 flex items-center justify-between sticky top-0 z-30 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
            <svg className="w-4 h-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
            </svg>
          </div>
          <span className="font-bold text-white text-sm tracking-tight">
            Claim<span className="text-violet-400">Grid</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <OnlineUsers count={onlineCount} />
          <button
            id="leave-btn"
            onClick={onLeave}
            className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1"
          >
            Leave
          </button>
        </div>
      </header>

      {/* ── Main layout: Left | Center | Right ─────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── Left Sidebar ────────────────────────────────────────── */}
        <aside className="w-64 flex-shrink-0 border-r border-white/5 overflow-y-auto p-4 space-y-4">
          {/* Profile card */}
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-xl flex-shrink-0 ring-2 ring-white/10"
                style={{ backgroundColor: user?.color }}
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.username}</p>
                <p className="text-[11px] text-slate-500 font-mono truncate">{user?.userId?.slice(0, 8)}…</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/3 rounded-xl p-2.5 text-center">
                <p className="text-lg font-bold text-violet-400 tabular-nums">{myTiles}</p>
                <p className="text-[10px] text-slate-500">My Tiles</p>
              </div>
              <div className="bg-white/3 rounded-xl p-2.5 text-center">
                <p className="text-lg font-bold text-amber-400 tabular-nums">
                  {leaderboard.findIndex((u) => u.userId === user?.userId) + 1 || "—"}
                </p>
                <p className="text-[10px] text-slate-500">Rank</p>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <Leaderboard leaderboard={leaderboard} currentUserId={user?.userId} />
        </aside>

        {/* ── Center: stats + grid ─────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 min-w-0">
          {/* Stats */}
          <StatsPanel tiles={tiles} user={user} />

          {/* Grid */}
          {loading ? (
            <div className="flex items-center justify-center h-80 glass rounded-2xl">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Loading grid…</p>
              </div>
            </div>
          ) : (
            <GridBoard
              tiles={tiles}
              recentTile={recentTile}
              user={user}
              onClaim={claimTile}
            />
          )}

          {/* Activity feed — visible only on small screens (below grid) */}
          <div className="xl:hidden">
            <ActivityFeed activity={activity} />
          </div>
        </main>

        {/* ── Right sidebar: Activity Feed (hidden on small screens) ── */}
        <aside className="hidden xl:flex flex-col w-72 flex-shrink-0 border-l border-white/5 p-4">
          <ActivityFeed activity={activity} />
        </aside>
      </div>
    </div>
  );
}
