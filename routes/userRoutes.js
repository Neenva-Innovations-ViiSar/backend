const express = require("express");
const router = express.Router();
const {
  handleLogin,
  verifyLogin,
  userProfile,
  updateUserProfile,
} = require("../controllers/userController");
const {
  userValidation,
  verifyToken,
} = require("../middlewares/authMiddleware");

router.post("/send-otp", userValidation, handleLogin);
router.post("/verify-otp", verifyLogin);//phonenumber + OTP
router.put("/update-profile", verifyToken, updateUserProfile);// phonenumber + class + name
router.get("/profile", verifyToken, userProfile);// all params


module.exports = router;
