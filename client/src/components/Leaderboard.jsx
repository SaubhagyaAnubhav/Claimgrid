export default function Leaderboard({ leaderboard, currentUserId }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">🏆</span>
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest">Leaderboard</h3>
      </div>

      {leaderboard.length === 0 ? (
        <p className="text-slate-500 text-xs text-center py-4">No claims yet — be first!</p>
      ) : (
        <ol className="space-y-1.5">
          {leaderboard.map((u, i) => {
            const isMe = u.userId === currentUserId;
            const medals = ["🥇", "🥈", "🥉"];
            return (
              <li
                key={u.userId}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-colors
                  ${isMe
                    ? "bg-violet-600/20 border border-violet-500/30"
                    : "bg-white/3 hover:bg-white/5 border border-transparent"
                  }`}
              >
                {/* Rank */}
                <span className="text-sm w-5 text-center flex-shrink-0">
                  {i < 3 ? medals[i] : <span className="text-slate-500 text-xs">{i + 1}</span>}
                </span>
                {/* Color dot */}
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0 ring-1 ring-white/10"
                  style={{ backgroundColor: u.color }}
                />
                {/* Name */}
                <span className={`text-xs flex-1 truncate font-medium ${isMe ? "text-violet-300" : "text-slate-300"}`}>
                  {u.username}
                  {isMe && <span className="ml-1 text-violet-500 text-[10px]">(you)</span>}
                </span>
                {/* Score */}
                <span className="text-xs font-bold text-white tabular-nums">{u.score}</span>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
