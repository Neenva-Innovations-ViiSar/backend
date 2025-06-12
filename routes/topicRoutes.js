const express = require("express");
const router = express.Router();
const {
  createTopic,
  getTopicsByLevel,
  getReels,
} = require("../controllers/topicController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Create a new topic under a specific level
router.post("/new", createTopic);

// Get all reels
router.get("/reels", verifyToken, getReels);

// Get all topics for a specific level
router.get("/:levelId", verifyToken, getTopicsByLevel);


module.exports = router;
