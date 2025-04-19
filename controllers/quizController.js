const Chapter = require('../models/Chapter');

//  Add a new quiz to a chapter
exports.addQuiz = async (req, res) => {
  const { chapterId } = req.params;
  const { question, options, correctAnswer } = req.body;

  try {
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    chapter.quizzes.push({ question, options, correctAnswer });
    await chapter.save();

    res.status(201).json({ message: 'Quiz added', quizzes: chapter.quizzes });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all quizzes of a chapter
exports.getQuizzes = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    res.status(200).json({ quizzes: chapter.quizzes });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

//  Update a specific quiz
exports.updateQuiz = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    const quiz = chapter.quizzes.id(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    quiz.question = req.body.question || quiz.question;
    quiz.options = req.body.options || quiz.options;
    quiz.correctAnswer = req.body.correctAnswer || quiz.correctAnswer;

    await chapter.save();
    res.status(200).json({ message: 'Quiz updated', quiz });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a quiz from a chapter
exports.deleteQuiz = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.chapterId);
    if (!chapter) return res.status(404).json({ message: 'Chapter not found' });

    chapter.quizzes.id(req.params.quizId).remove();
    await chapter.save();

    res.status(200).json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
