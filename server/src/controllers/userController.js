const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

// Random username adjectives + nouns for fallback
const ADJECTIVES = ["Swift", "Bold", "Cosmic", "Neon", "Hyper", "Iron", "Sly", "Phantom", "Lucky", "Rapid"];
const NOUNS = ["Claimant", "Titan", "Viper", "Eagle", "Storm", "Ghost", "Fox", "Blaze", "Shark", "Rogue"];
const COLORS = [
  "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#1abc9c",
  "#3498db", "#9b59b6", "#e91e63", "#00bcd4", "#ff5722",
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const generateUsername = () =>
  `${randomFrom(ADJECTIVES)}${randomFrom(NOUNS)}${Math.floor(Math.random() * 100)}`;

const generateColor = () => randomFrom(COLORS);

// POST /api/users/session
const createSession = async (req, res) => {
  try {
    let { username, color } = req.body;

    if (!username || username.trim() === "") username = generateUsername();
    if (!color || color.trim() === "") color = generateColor();

    const userId = uuidv4();

    const user = await User.create({ userId, username: username.trim(), color });

    res.status(201).json({ success: true, user });
  } catch (error) {
    console.error("createSession error:", error.message);
    res.status(500).json({ success: false, message: "Failed to create session." });
  }
};

// GET /api/leaderboard
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ score: -1 }).limit(50);
    res.json({ success: true, leaderboard: users });
  } catch (error) {
    console.error("getLeaderboard error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch leaderboard." });
  }
};

module.exports = { createSession, getLeaderboard };
