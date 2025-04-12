const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phonenumber: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      default: "", // Will be filled after user enters it
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
