const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lang: { type: String, required: true },
    audioUrl: { type: String, required: true },
    
    // New field to differentiate between topic and reel
    type: {
      type: String,
      enum: ['topic', 'reel'],
      default: 'topic',
    },

    voiceGiver: { type: String },

    // These are required only for 'topic' - chapter related
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
    },
    levelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
    },
    sequence: { type: Number }, // For ordering topic audios
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);
