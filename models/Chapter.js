const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  sequence: [
    {
      contentType: { type: String, enum: ['Topic', 'Quiz'], required: true },
      refId: { type: mongoose.Schema.Types.ObjectId, required: true }
    }
  ],
},{ timestamps: true }
);

module.exports = mongoose.model("Chapter", chapterSchema);
