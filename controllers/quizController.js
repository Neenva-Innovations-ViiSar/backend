const Quiz = require("../models/Quiz");
const Level = require("../models/Level");
const Chapter = require("../models/Chapter");

// POST /api/quiz/:levelId/quizzes/new
exports.addQuiz = async (req, res) => {
  try {
    const { levelId } = req.params;
    const { question, options, correctAnswer, points } = req.body;

    // Validate required fields
    if (!question || !options || !correctAnswer) {
      return res.status(400).json({
        message: "Missing required fields: question, options, correctAnswer",
      });
    }

    // Find the level to get the chapterId
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

    // Update Level.sequence
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

    const quizzes = await Quiz.find({ chapterId: level.chapterId });

    res.status(200).json({ quizzes });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT /api/quiz/:levelId/quizzes/:quizId
exports.updateQuiz = async (req, res) => {
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

    quiz.question = req.body.question || quiz.question;
    quiz.options = req.body.options || quiz.options;
    quiz.correctAnswer = req.body.correctAnswer || quiz.correctAnswer;
    quiz.points = req.body.points ?? quiz.points;

    await quiz.save();

    res.status(200).json({ message: "Quiz updated", quiz });
  } catch (err) {
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
