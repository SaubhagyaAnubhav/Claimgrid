import { useState, useEffect, useCallback, useRef } from "react";
import api from "../lib/api";
import socket from "../lib/socket";

export function useGrid(user, addToast) {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentTile, setRecentTile] = useState(null); // tileId that just got claimed (for pulse)
  const [leaderboard, setLeaderboard] = useState([]);
  const [activity, setActivity] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const pulseTimerRef = useRef(null);

  // ── Fetch initial grid ──────────────────────────────────────────
  useEffect(() => {
    const fetchGrid = async () => {
      try {
        const { data } = await api.get("/api/grid");
        setTiles(data.tiles);
      } catch {
        addToast?.("Failed to load grid.", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchGrid();
  }, []);

  // ── Socket event handlers ───────────────────────────────────────
  useEffect(() => {
    const onTileClaimed = ({ tile }) => {
      setTiles((prev) =>
        prev.map((t) => (t.tileId === tile.tileId ? tile : t))
      );
      // Pulse for 600ms
      setRecentTile(tile.tileId);
      if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current);
      pulseTimerRef.current = setTimeout(() => setRecentTile(null), 600);
    };

    const onLeaderboardUpdate = ({ leaderboard }) => {
      setLeaderboard(leaderboard);
    };

    const onActivityNew = (event) => {
      setActivity((prev) => [event, ...prev].slice(0, 50)); // keep last 50
    };

    const onOnlineCount = ({ count }) => {
      setOnlineCount(count);
    };

    const onClaimFailed = ({ reason }) => {
      addToast?.(reason, "error");
    };

    socket.on("tile:claimed",        onTileClaimed);
    socket.on("leaderboard:update",  onLeaderboardUpdate);
    socket.on("activity:new",        onActivityNew);
    socket.on("online:count",        onOnlineCount);
    socket.on("tile:claim_failed",   onClaimFailed);

    return () => {
      socket.off("tile:claimed",       onTileClaimed);
      socket.off("leaderboard:update", onLeaderboardUpdate);
      socket.off("activity:new",       onActivityNew);
      socket.off("online:count",       onOnlineCount);
      socket.off("tile:claim_failed",  onClaimFailed);
      if (pulseTimerRef.current) clearTimeout(pulseTimerRef.current);
    };
  }, [addToast]);

  // ── Claim action ────────────────────────────────────────────────
  const claimTile = useCallback(
    (tileId) => {
      if (!user) return;
      socket.emit("tile:claim", { tileId, userId: user.userId });
    },
    [user]
  );

  return { tiles, loading, recentTile, leaderboard, activity, onlineCount, claimTile };
}
