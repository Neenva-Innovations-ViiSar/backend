const express = require("express");
const router = express.Router();
const {
  createChapter,
  getChapterBySubject,
} = require("../controllers/chapterController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/new", verifyToken, createChapter);
router.get("/:subjectId", verifyToken, getChapterBySubject);

module.exports = router;
