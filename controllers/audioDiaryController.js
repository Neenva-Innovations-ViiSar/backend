const AudioDiary = require("../models/AudioDiary");

exports.createDiary = async (req, res) => {
  try {
    const userId = req.user.id;
    const audioUrl = req.file.path;

    const diary = await AudioDiary.create({
      userId,
      audioUrl,
      title: req.body.title || "Untitled",
      notes: req.body.notes || "",
    });

    res.status(201).json({ success: true, data: diary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getDiary = async (req, res) => {
  try {
    const entries = await AudioDiary.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteDiary = async (req, res) => {
  try {
    const deleted = await AudioDiary.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Entry not found" });
    }

    res.status(200).json({ success: true, message: "Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
