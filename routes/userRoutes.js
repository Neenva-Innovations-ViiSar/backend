const express = require("express");
const router = express.Router();
const {
  generateUsername,
  setPassword,
  updateUserProfile,
  login,
  userProfile,
} = require("../controllers/userController");

const { verifyToken, passwordValidation, loginValidation} = require("../middlewares/authMiddleware");
const { userValidation } = require("../middlewares/authMiddleware"); // Import the validation middleware

// Signup Flow
router.post("/signup/username", userValidation, generateUsername); // Apply userValidation middleware
router.post("/signup/password", passwordValidation, setPassword); // Apply userValidation middleware
router.post("/update-profile", verifyToken, updateUserProfile); // Class preference

// Login
router.post("/login", loginValidation, login); // Apply userValidation middleware for login (optional if username/password is required)

// Get user profile
router.get("/profile", verifyToken, userProfile);

module.exports = router;
