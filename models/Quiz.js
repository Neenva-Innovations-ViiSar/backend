const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true
  },

  question: {
    type: String,
    required: true,
    trim: true
  },

  options: {
    type: [String],
    validate: {
      validator: arr => arr.length >= 2,
      message: 'Quiz must have at least 2 options.'
    },
    required: true
  },

  correctAnswer: {
    type: String,
    required: true
  },

  points: {
    type: Number,
    default: 1,
    min: 0
  }

}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);
