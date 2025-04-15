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
});

module.exports = mongoose.model("User", userSchema);
