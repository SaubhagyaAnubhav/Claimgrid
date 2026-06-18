export default function StatsPanel({ tiles, user }) {
  const totalTiles  = tiles.length;
  const claimed     = tiles.filter((t) => t.ownerId !== null).length;
  const unclaimed   = totalTiles - claimed;
  const myTiles     = tiles.filter((t) => t.ownerId === user?.userId).length;
  const pct         = totalTiles > 0 ? Math.round((claimed / totalTiles) * 100) : 0;

  const stats = [
    { label: "Total Tiles",  value: totalTiles,  color: "text-slate-300" },
    { label: "Claimed",      value: claimed,      color: "text-violet-400" },
    { label: "Unclaimed",    value: unclaimed,    color: "text-emerald-400" },
    { label: "Your Tiles",   value: myTiles,      color: "text-amber-400" },
  ];

  return (
    <div className="glass rounded-2xl p-4">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-slate-400 font-medium">Board Coverage</span>
          <span className="text-xs font-bold text-white">{pct}%</span>
        </div>
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-violet-400 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-4 gap-2">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="bg-white/3 rounded-xl px-3 py-2.5 text-center">
            <p className={`text-lg font-bold tabular-nums ${color}`}>{value}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
