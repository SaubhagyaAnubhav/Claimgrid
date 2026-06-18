const Tile = require("../models/Tile");

// GET /api/grid — return all tiles sorted by tileId
const getGrid = async (req, res) => {
  try {
    const tiles = await Tile.find().sort({ tileId: 1 });
    res.json({ success: true, total: tiles.length, tiles });
  } catch (error) {
    console.error("getGrid error:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch grid." });
  }
};

module.exports = { getGrid };
