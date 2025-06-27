const Level = require("../models/Level");
const Chapter = require("../models/Chapter");
const User = require("../models/User");
const mongoose = require("mongoose");

// POST /levels/new
exports.createLevel = async (req, res) => {
  const { name, chapterId, levelNumber } = req.body;

  try {
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const level = new Level({ name, chapterId, levelNumber });
    await level.save();

    res.status(201).json({ message: "Level created", level });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /levels/:chapterId
exports.getLevelsByChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { id  } = req.user;

    const levels = await Level.find({ chapterId }).sort({ levelNumber: 1 });
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const response = levels.map(level => {
      const progress = user.progress.find(p => p.levelId.toString() === level._id.toString());
      return {
        _id: level._id,
        levelNumber: level.levelNumber,
        isUnlocked: progress?.isUnlocked || (level.levelNumber === 1), // First level always unlocked
        isCompleted: progress?.isCompleted || false,
        score: progress?.score || 0
      };
    });

    res.status(200).json({ levels: response });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.deleteall = async (req, res) => {
  try {
    const deleted = await Level.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All level entries deleted",
      deletedCount: deleted.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.deleteById = async (req, res) => {
  try {
    const { leveld } = req.params;

    if (!mongoose.isValidObjectId(leveld)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const deleted = await Level.findByIdAndDelete(leveld);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Level not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Level deleted",
      deleted,
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


