const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  options: [
    {
      type: String,
      required: true
    }
  ],
  correctAnswer: {
    type: String,
    required: true
  },
  points: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
