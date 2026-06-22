const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const gridRoutes = require("./routes/gridRoutes");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST"],
}));
app.use(express.json());

// ─── Connect database on request for Serverless environments ───
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
});

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

module.exports = app;
