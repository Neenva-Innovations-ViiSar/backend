const mongoose = require("mongoose");

const audioFileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  filePath: { type: String, required: true },
  mimeType: { type: String },
  topicId: {
    //topicId
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
},{ timestamps: true }
);


//Option -2 

// module.exports = mongoose.model("AudioFile", audioFileSchema);

// const mongoose = require("mongoose");

// const audioSchema = new mongoose.Schema({
//   topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" },
//   audioUrl: { type: String, required: true }, // where you store audio
// });

// module.exports = mongoose.model("Audio", audioSchema);

