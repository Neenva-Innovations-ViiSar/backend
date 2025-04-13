const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  name: { type: String },
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  lastAccessed: {
    classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
  },
});

module.exports = mongoose.model("User", userSchema);
