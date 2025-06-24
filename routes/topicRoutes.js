const express = require("express");
const router = express.Router();
const {
  createTopic,
  getReels,
  getTopicsByLevel,
  deleteall,
} = require("../controllers/topicController");
const { verifyToken } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");

// Create a new topic under a specific level
router.post("/new", upload.single('audio'), createTopic);

// Get all reels
router.get("/reels", verifyToken, getReels);

router.get("/:levelId", verifyToken, getTopicsByLevel);
router.delete("/", deleteall);

module.exports = router;
