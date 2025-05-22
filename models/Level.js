const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
  chapterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  levelNumber: { type: Number, required: true },
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topic' }],
  finalAssessment: {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }, // optional
    isRequired: { type: Boolean, default: true },
  },
});

module.exports = mongoose.model('Level', levelSchema);
