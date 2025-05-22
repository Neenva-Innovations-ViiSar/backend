const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

// Step 1: Generate unique username
async function generateUsername(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    let username;
    let exists = true;

    while (exists) {
      const randomNum = Math.floor(100 + Math.random() * 900); // 3-digit
      username = `${name}${randomNum}`;
      exists = await User.findOne({ username });
    }

    const newUser = new User({ username, name });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Username created successfully",
      data: {
        userId: newUser._id,
        username: newUser.username,
        name: newUser.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Step 2: Set password (with bcrypt hashing)
async function setPassword(req, res) {
  try {
    const { userId, password } = req.body;

    if (!userId || !password)
      return res.status(400).json({ message: "User ID and password required" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Password set successfully",
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Adding class preference to user profile
const updateUserProfile = async (req, res) => {
  try {
    // console.log("Logged in user:", req.user); // Debug log
    const { classId } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { classId },
      { new: true }
    ).select("-__v");

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login: verify username & password
async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Username not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          classId: user.classId || "No class selected", // Ensure classId is provided
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Fetch user profile data
async function userProfile(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .populate("classId", "name")
      .select("-__v");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// PATCH /user/progress
const updateUserProgress = async (req, res) => {
  try {
    const { chapterId, topicId, quizCompleted } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const progressEntry = user.progress.find((p) =>
      p.chapterId.equals(chapterId)
    );

    if (progressEntry) {
      if (topicId && !progressEntry.completedTopics.includes(topicId)) {
        progressEntry.completedTopics.push(topicId);
      }
      if (quizCompleted !== undefined) {
        progressEntry.quizCompleted = quizCompleted;
      }
    } else {
      user.progress.push({
        chapterId,
        completedTopics: topicId ? [topicId] : [],
        quizCompleted: quizCompleted || false,
      });
    }

    await user.save();

    res
      .status(200)
      .json({
        success: true,
        message: "Progress updated",
        data: user.progress,
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  generateUsername,
  setPassword,
  userProfile,
  updateUserProfile,
  login,
  updateUserProgress,
};
