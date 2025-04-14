const express = require("express");
const router = express.Router();
const {
  createSubject,
  getSubjectsByClass,
} = require("../controllers/subjectController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/new", createSubject);// admin has access to create subjects
router.get("/:classId", verifyToken, getSubjectsByClass); // fetch subjects for a given classId
module.exports = router;
