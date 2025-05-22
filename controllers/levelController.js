const Level = require("../models/Level");
const Chapter = require("../models/Chapter");

// POST /levels/new
exports.createLevel = async (req, res) => {
  const { name, chapterId, levelNumber } = req.body;

  try {
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) return res.status(404).json({ message: "Chapter not found" });

    const level = new Level({ name, chapterId, levelNumber });
    await level.save();

    res.status(201).json({ message: "Level created", level });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /levels/:chapterId
exports.getLevelsByChapter = async (req, res) => {
  try {
    const levels = await Level.find({ chapterId: req.params.chapterId });
    res.status(200).json({ levels });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
