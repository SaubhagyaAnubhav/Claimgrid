const express = require("express");
const router = express.Router();
const { getGrid } = require("../controllers/gridController");

// GET /api/grid
router.get("/", getGrid);

module.exports = router;
