const mongoose = require("mongoose");

const audioDiarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    title: {
        type: String
    },
    audioUrl: {
        type: String,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model("AudioDiary", audioDiarySchema);