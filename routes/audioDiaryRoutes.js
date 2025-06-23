const express = require("express"); 
const router = express.Router();
const upload = require("../middlewares/multer");
const { verifyToken } = require("../middlewares/authMiddleware"); 
const { createDiary, getDiary, deleteDiary, deleteall } = require("../controllers/audioDiaryController");

router.post("/", verifyToken, upload.single('audio'), createDiary);
router.get("/", verifyToken, getDiary);
router.delete("/:id", verifyToken, deleteDiary);
router.delete("/", deleteall);

module.exports = router;
