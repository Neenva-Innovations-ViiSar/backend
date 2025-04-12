const express = require("express");
const router = express.Router();
const { createClass, getAllClasses } = require("../controllers/classController");

router.post("/new", createClass);// admin will have access for making class
router.get("/", getAllClasses);// when taking class input from user.

module.exports = router;
