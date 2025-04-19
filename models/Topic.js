const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lang: { type: String, required: true },
    audioUrl: { type: String, required: true },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    sequence: { type: Number, required: true } // for sequencing the audio.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
