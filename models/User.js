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
    levelId: { type: mongoose.Schema.Types.ObjectId, ref: "Level" },
    isUnlocked: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    unlockedAt: { type: Date, default: Date.now },
  },
],
});

module.exports = mongoose.model("User", userSchema);
