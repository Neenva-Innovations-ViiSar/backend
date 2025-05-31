const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    levels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
