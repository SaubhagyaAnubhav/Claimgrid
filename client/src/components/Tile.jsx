import { memo } from "react";

const Tile = memo(function Tile({ tile, isRecent, isOwner, onClick }) {
  const { tileId, ownerId, ownerName, ownerColor } = tile;
  const isClaimed = ownerId !== null;

  return (
    <div
      id={`tile-${tileId}`}
      onClick={onClick}
      title={isClaimed ? `${ownerName} (#${tileId})` : `Tile #${tileId} — unclaimed`}
      className={`
        aspect-square rounded-sm cursor-pointer select-none
        transition-all duration-200 ease-out
        ${isClaimed
          ? "hover:brightness-125 hover:scale-110 hover:z-10 relative"
          : "bg-slate-800/60 hover:bg-slate-700/80 hover:scale-110 hover:z-10 relative border border-slate-700/30"
        }
        ${isOwner ? "ring-1 ring-white/40" : ""}
        ${isRecent ? "tile-pulse z-20" : ""}
      `}
      style={isClaimed ? { backgroundColor: ownerColor } : undefined}
    />
  );
});

export default Tile;
