const AudioDiary = require("../models/AudioDiary");

exports.createDiary = async (req, res) => {
  try {
    const userId = req.user.id;
    const audioUrl = req.file.path;

    const originalName = req.file.originalname; // e.g., audio_2025-06-20_20-02-06.aac

    // Regex to extract date and time
    const regex = /audio_(\d{4}-\d{2}-\d{2})_(\d{2}-\d{2}-\d{2})/;
    const match = originalName.match(regex);

    let generatedTitle = "Untitled";
    if (match) {
      const date = match[1]; // 2025-06-20
      const time = match[2].replace(/-/g, ":"); // 20:02:06
      generatedTitle = `Audio on ${date} at ${time}`;
    }

    const diary = await AudioDiary.create({
      userId,
      audioUrl,
      title: req.body.title || generatedTitle,
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
