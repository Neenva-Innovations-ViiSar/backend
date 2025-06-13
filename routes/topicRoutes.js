const express = require("express");
const router = express.Router();
const {
  createTopic,
  getReels,
  getTopic,
} = require("../controllers/topicController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Create a new topic under a specific level
router.post("/new", createTopic);

// Get all reels
router.get("/reels", verifyToken, getReels);


router.get("/:topicId", verifyToken, getTopic);


module.exports = router;
