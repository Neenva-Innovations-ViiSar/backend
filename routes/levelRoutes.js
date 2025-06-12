const express = require("express");
const router = express.Router();
const {
  createLevel,
  getLevelsByChapter,
  getLevelContent,
} = require("../controllers/levelController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Create a new level under a chapter
router.post("/new", createLevel);

// Get all levels under a specific chapter
router.get("/:chapterId", verifyToken, getLevelsByChapter);

router.get("/:levelId/contents", verifyToken, getLevelContent);

module.exports = router;
