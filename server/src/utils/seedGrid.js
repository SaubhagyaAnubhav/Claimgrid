const Tile = require("../models/Tile");

const seedGrid = async () => {
  try {
    const count = await Tile.countDocuments();

    if (count > 0) {
      console.log(`Grid already seeded. (${count} tiles found — skipping.)`);
      return;
    }

    const GRID_SIZE = 30;
    const tiles = [];

    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const tileId = y * GRID_SIZE + x; // 0 → 899
        tiles.push({ tileId, x, y });
      }
    }

    await Tile.insertMany(tiles);
    console.log(`Grid seeded successfully: ${tiles.length} tiles inserted.`);
  } catch (error) {
    console.error("Grid seeding failed:", error.message);
  }
};

module.exports = seedGrid;
