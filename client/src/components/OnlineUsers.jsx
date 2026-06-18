export default function OnlineUsers({ count }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 glass rounded-xl">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-xs text-slate-400">
        <span className="font-bold text-white">{count}</span>
        {" "}{count === 1 ? "player" : "players"} online
      </span>
    </div>
  );
}
