const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  lang: {
    type: String,
    required: true,
    enum: ['en', 'hi'],
    lowercase: true
  },

  audioUrl: {
    type: String,
    required: true
  },

  type: {
    type: String,
    enum: ['topic', 'reel'],
    default: 'topic'
  },

  voiceGiver: {
    type: String,
    trim: true
  },

  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter'
  },

  levelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Level'
  },

  sequence: {
    type: Number,
    min: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Topic', topicSchema);
