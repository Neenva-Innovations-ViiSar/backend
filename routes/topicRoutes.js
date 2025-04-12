const express = require("express");
const router = express.Router();
const {
  createTopic,
  getTopicsByChapter,
} = require("../controllers/topicController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/new", verifyToken, createTopic); // create topic
router.get("/:chapterId", verifyToken, getTopicsByChapter); // get topics by chapter

module.exports = router;
