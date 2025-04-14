const express = require("express");
const router = express.Router();
const { createClass, getAllClasses } = require("../controllers/classController");
const { verifyToken } = require("../middlewares/authMiddleware");

router.post("/new",createClass);// admin will have access for making class
router.get("/",verifyToken, getAllClasses);// when taking class input from user.

module.exports = router;
