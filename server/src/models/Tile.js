const mongoose = require("mongoose");

const tileSchema = new mongoose.Schema(
  {
    tileId: {
      type: Number,
      required: true,
      unique: true,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    ownerId: {
      type: String,
      default: null,
    },
    ownerName: {
      type: String,
      default: null,
    },
    ownerColor: {
      type: String,
      default: null,
    },
    claimedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Tile", tileSchema);
