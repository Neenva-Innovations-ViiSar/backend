const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  name: { type: String },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  lastVisited: {
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  },
  progress: [
  {
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    completedTopics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
    quizCompleted: { type: Boolean, default: false },
    unlockedAt: { type: Date, default: Date.now },
  },
],

});

module.exports = mongoose.model("User", userSchema);
