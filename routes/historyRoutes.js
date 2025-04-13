const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { updateLastVisited, getLastVisited } = require("../controllers/historyConrtoller");
const router = express.Router();

router.put("/update", verifyToken, updateLastVisited);// from user end (frontend)
router.get("/get-history", verifyToken, getLastVisited);// from backend to frontend

module.exports = router;