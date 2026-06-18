import Tile from "./Tile";

const GRID_SIZE = 30;

export default function GridBoard({ tiles, recentTile, user, onClaim }) {
  if (tiles.length === 0) {
    return (
      <div className="flex items-center justify-center h-96 glass rounded-2xl">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading 900 tiles…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-4 overflow-auto">
      {/* Grid container — fixed pixel size so it always renders at right scale */}
      <div
        className="mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gap: "2px",
          minWidth: "400px",
          maxWidth: "720px",
        }}
      >
        {tiles.map((tile) => (
          <Tile
            key={tile.tileId}
            tile={tile}
            isRecent={recentTile === tile.tileId}
            isOwner={tile.ownerId === user?.userId}
            onClick={() => onClaim(tile.tileId)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 justify-center mt-4 pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-slate-800/60 border border-slate-700/30" />
          <span className="text-xs text-slate-500">Unclaimed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: user?.color || "#8b5cf6" }} />
          <span className="text-xs text-slate-500">Your tiles</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-rose-500/70" />
          <span className="text-xs text-slate-500">Others</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm bg-slate-700 ring-1 ring-white/30" />
          <span className="text-xs text-slate-500">Recently claimed</span>
        </div>
      </div>
    </div>
  );
}
