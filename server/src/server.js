const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const seedGrid = require("./utils/seedGrid");
const gridRoutes = require("./routes/gridRoutes");
const userRoutes = require("./routes/userRoutes");
const gridSocket = require("./sockets/gridSocket");
require("dotenv").config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST"],
}));
app.use(express.json());

// ─── Health check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "ClaimGrid backend is running " });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/grid", gridRoutes);
app.use("/api/users", userRoutes);

// Convenience alias so /api/leaderboard also works directly
app.use("/api/leaderboard", (req, res, next) => {
  req.url = "/leaderboard";
  userRoutes(req, res, next);
});

// ─── HTTP + Socket.IO server ──────────────────────────────────────────────────
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST"],
  },
});

// Attach socket logic
gridSocket(io);

// ─── Connect DB → seed grid → start server ────────────────────────────────────
const PORT = process.env.PORT || 5001;

const start = async () => {
  await connectDB();
  await seedGrid();          // seeds only if collection is empty

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();