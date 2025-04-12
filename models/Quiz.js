const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: String, // or use index if you prefer
    },
  ],
},{ timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
