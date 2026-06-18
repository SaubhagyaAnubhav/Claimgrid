const express = require("express");
const router = express.Router();
const { createSession, getLeaderboard } = require("../controllers/userController");

// POST /api/users/session
router.post("/session", createSession);

// GET /api/leaderboard  (mounted under /api/users but exposed via /api/leaderboard in server.js)
router.get("/leaderboard", getLeaderboard);

module.exports = router;
