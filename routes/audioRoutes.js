const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/new", verifyToken);
router.get("/:topicId", verifyToken);

module.exports = router;