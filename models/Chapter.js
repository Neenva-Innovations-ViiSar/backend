const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    sequence: [
      {
        contentType: { type: String, enum: ["Topic", "Quiz"], required: true },
        refId: { type: mongoose.Schema.Types.ObjectId, required: true },
      },
    ],
    levels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
