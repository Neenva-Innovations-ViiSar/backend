const Quiz = require("../models/Quiz");
const Level = require("../models/Level");
const Chapter = require("../models/Chapter");

exports.addQuiz = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const { question, options, correctAnswer, points, levelId } = req.body;

    // Basic validation
    if (!question || !options || !correctAnswer || !levelId) {
      return res.status(400).json({ message: "Missing required fields: question, options, correctAnswer, levelId" });
    }

    const chapter = await Chapter.findById(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const newQuiz = new Quiz({
      chapterId,
      question,
      options,
      correctAnswer,
      points: points || 1
    });

    await newQuiz.save();

    //Update Level.sequence
    await Level.findByIdAndUpdate(levelId, {
      $push: {
        sequence: {
          contentType: "Quiz",
          refId: newQuiz._id
        }
      }
    });

    res.status(201).json({ message: "Quiz created", quiz: newQuiz });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const { chapterId } = req.params;
    const quizzes = await Quiz.find({ chapterId });
    res.status(200).json({ quizzes });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

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

exports.deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    // Delete from Quiz collection
    const quiz = await Quiz.findByIdAndDelete(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    // Remove from Level.sequence
    await Level.updateMany(
      { "sequence.refId": quizId },
      { $pull: { sequence: { refId: quizId } } }
    );

    res.status(200).json({ message: "Quiz deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
