const express = require("express");
const router = express.Router();
const {
  createTopic,
  getTopicsByLevel,
} = require("../controllers/topicController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Create a new topic under a specific level
router.post("/new", createTopic);

// Get all topics for a specific level
router.get("/:levelId", verifyToken, getTopicsByLevel);

module.exports = router;
