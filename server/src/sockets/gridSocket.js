const User = require("../models/User");
const Tile = require("../models/Tile");

// Track online users: socketId → userId
const onlineUsers = new Map();

const gridSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Broadcast updated online count
    const broadcastOnlineCount = () => {
      io.emit("online:count", { count: onlineUsers.size });
    };

    socket.on("user:join", async (userId) => {
      onlineUsers.set(socket.id, userId);
      console.log(`User joined: ${userId} (socket: ${socket.id})`);
      broadcastOnlineCount();

      // Emit join activity
      try {
        const user = await User.findOne({ userId });
        if (user) {
          io.emit("activity:new", {
            id: Date.now(),
            type: "join",
            username: user.username,
            userColor: user.color,
            message: `${user.username} joined the board`,
            createdAt: new Date().toISOString(),
          });
        }
      } catch (_) {}
    });

    // ─── tile:claim ───────────────────────────────────────────────
    socket.on("tile:claim", async ({ tileId, userId }) => {
      try {
        // 1. Validate inputs
        if (tileId === undefined || !userId) {
          return socket.emit("tile:claim_failed", {
            tileId,
            reason: "Missing tileId or userId.",
          });
        }

        // 2. Validate user exists
        const user = await User.findOne({ userId });
        if (!user) {
          return socket.emit("tile:claim_failed", {
            tileId,
            reason: "User not found.",
          });
        }

        // 3. Cooldown check (2 seconds)
        const COOLDOWN_MS = 2000;
        if (user.lastClaimAt) {
          const elapsed = Date.now() - new Date(user.lastClaimAt).getTime();
          if (elapsed < COOLDOWN_MS) {
            const remaining = ((COOLDOWN_MS - elapsed) / 1000).toFixed(1);
            return socket.emit("tile:claim_failed", {
              tileId,
              reason: `Cooldown active. Wait ${remaining}s.`,
            });
          }
        }

        // 4. Atomic claim — only succeeds if tile is currently unclaimed
        const updatedTile = await Tile.findOneAndUpdate(
          { tileId, ownerId: null },           // condition: must be unclaimed
          {
            $set: {
              ownerId: user.userId,
              ownerName: user.username,
              ownerColor: user.color,
              claimedAt: new Date(),
            },
          },
          { new: true }
        );

        if (!updatedTile) {
          // Tile was already owned by someone else
          return socket.emit("tile:claim_failed", {
            tileId,
            reason: "Tile already claimed.",
          });
        }

        // 5. Update user score and lastClaimAt
        await User.findOneAndUpdate(
          { userId },
          { $inc: { score: 1 }, $set: { lastClaimAt: new Date() } }
        );

        // 6. Fetch fresh leaderboard
        const leaderboard = await User.find().sort({ score: -1 }).limit(50);

        // 7. Broadcast to ALL clients
        io.emit("tile:claimed", { tile: updatedTile });

        io.emit("leaderboard:update", { leaderboard });

        io.emit("activity:new", {
          id: Date.now(),
          type: "claim",
          username: user.username,
          userColor: user.color,
          tileId: updatedTile.tileId,
          message: `${user.username} captured tile #${updatedTile.tileId}`,
          createdAt: new Date().toISOString(),
        });

        console.log(`Tile ${tileId} claimed by ${user.username}`);
      } catch (error) {
        console.error("tile:claim error:", error.message);
        socket.emit("tile:claim_failed", {
          tileId,
          reason: "Server error. Please try again.",
        });
      }
    });

    // ─── disconnect ───────────────────────────────────────────────
    socket.on("disconnect", () => {
      onlineUsers.delete(socket.id);
      console.log(`Socket disconnected: ${socket.id}`);
      broadcastOnlineCount();
    });
  });
};

module.exports = gridSocket;
