const express = require("express");
const router = express.Router();
const {
  createTopic,
  getTopicsByChapter,
} = require("../controllers/topicController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/new", createTopic);
router.get("/:chapterId", verifyToken, getTopicsByChapter);

module.exports = router;
