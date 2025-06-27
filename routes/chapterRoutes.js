const express = require("express");
const router = express.Router();
const {
  createChapter,
  getChapterBySubject,
  deleteChapter,
  deleteall,
  deleteById,
} = require("../controllers/chapterController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/new", createChapter);
router.get("/:subjectId", verifyToken, getChapterBySubject);
router.delete("/delete/:chapterId", deleteChapter);
router.delete("/:chapterId/delete", deleteById);
router.delete("/", deleteall);
module.exports = router;
