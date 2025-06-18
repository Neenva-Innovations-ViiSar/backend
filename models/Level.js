const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  levelNumber: { type: Number, required: true },
  finalAssessment: {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    isRequired: { type: Boolean, default: true },
  },
  sequence: [
    {
      contentType: { type: String, enum: ["Topic", "Quiz"], required: true },
      refId: { type: mongoose.Schema.Types.ObjectId, required: true },
    },
  ],
});

module.exports = mongoose.model('Level', levelSchema);
