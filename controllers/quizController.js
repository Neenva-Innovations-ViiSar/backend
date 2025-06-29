const Quiz = require("../models/Quiz");
const Level = require("../models/Level");
const User = require("../models/User");
const mongoose = require("mongoose");

// POST /api/quiz/:levelId/quizzes/new
exports.addQuiz = async (req, res) => {
  try {
    const { levelId } = req.params;
    const { question, options, correctAnswer, points } = req.body;

    if (!question || !options || !correctAnswer) {
      return res.status(400).json({
        message: "Missing required fields: question, options, correctAnswer",
      });
    }

    const level = await Level.findById(levelId);
    if (!level) return res.status(404).json({ message: "Level not found" });

    const chapterId = level.chapterId;

    const newQuiz = new Quiz({
      chapterId,
      levelId,
      question,
      options,
      correctAnswer,
      points: points || 1,
    });

    await newQuiz.save();

    await Level.findByIdAndUpdate(levelId, {
      $push: {
        sequence: {
          contentType: "Quiz",
          refId: newQuiz._id,
        },
      },
    });

    res.status(201).json({ message: "Quiz created", quiz: newQuiz });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/quiz/:levelId/quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const { levelId } = req.params;

    const level = await Level.findById(levelId);
    if (!level) return res.status(404).json({ message: "Level not found" });

    const quizzes = await Quiz.find({ levelId });

    res.status(200).json({ quizzes });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.submitQuiz = async (req, res) => {
  try {
    const { id } = req.user;
    const { levelId } = req.params;
    const { obtainedPoints, totalPoints } = req.body;

    const level = await Level.findById(levelId);
    if (!level) return res.status(404).json({ message: "Level not found" });

    const percentage = (obtainedPoints / totalPoints) * 100;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    let progressEntry = user.progress.find(p => p.levelId.toString() === levelId);

    if (progressEntry) {
      progressEntry.isCompleted = true;
      progressEntry.score = obtainedPoints;
    } else {
      user.progress.push({
        chapterId: level.chapterId,
        levelId: levelId,
        isUnlocked: true,
        isCompleted: true,
        score: obtainedPoints
      });
    }

    let nextLevelUnlocked = false;

    if (percentage >= 50) {
      const nextLevel = await Level.findOne({
        chapterId: level.chapterId,
        levelNumber: level.levelNumber + 1
      });

      if (nextLevel) {
        let nextProgress = user.progress.find(p => p.levelId.toString() === nextLevel._id.toString());
        if (nextProgress) {
          nextProgress.isUnlocked = true;
        } else {
          user.progress.push({
            chapterId: nextLevel.chapterId,
            levelId: nextLevel._id,
            isUnlocked: true,
            isCompleted: false,
            score: 0
          });
        }
        nextLevelUnlocked = true;
      }
    }

    await user.save();

    res.status(200).json({
      message: "Quiz submitted successfully",
      obtainedPoints,
      totalPoints,
      percentage,
      nextLevelUnlocked
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// DELETE /api/quiz/:levelId/quizzes/:quizId
exports.deleteQuiz = async (req, res) => {
  try {
    const { levelId, quizId } = req.params;

    const level = await Level.findById(levelId);
    if (!level) return res.status(404).json({ message: "Level not found" });

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    if (quiz.chapterId.toString() !== level.chapterId.toString()) {
      return res
        .status(403)
        .json({ message: "Quiz does not belong to this level's chapter" });
    }

    // Delete from quiz collection
    await Quiz.findByIdAndDelete(quizId);

    // Remove from Level.sequence
    await Level.findByIdAndUpdate(levelId, {
      $pull: { sequence: { refId: quizId } },
    });

    res.status(200).json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.deleteall = async (req, res) => {
  try {
    const deleted = await Quiz.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All quiz entries deleted",
      deletedCount: deleted.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// delete one by ID
exports.deleteById = async (req, res) => {
  try {
    const { quizId } = req.params;

    if (!mongoose.isValidObjectId(quizId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID format",
      });
    }

    const deleted = await Quiz.findByIdAndDelete(quizId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Quiz not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Quiz deleted",
      deleted,
    });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
