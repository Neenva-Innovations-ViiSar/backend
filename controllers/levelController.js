const Level = require("../models/Level");
const Chapter = require("../models/Chapter");
const Topic = require("../models/Topic");
const Quiz = require("../models/Quiz");

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

exports.getLevelContent = async (req, res) => {
  try {
    const { levelId } = req.params;

    const level = await Level.findById(levelId);
    if (!level) return res.status(404).json({ message: 'Level not found' });

    const populatedSequence = await Promise.all(
      level.sequence.map(async (item) => {
        if (item.contentType === 'Topic') {
          const topic = await Topic.findById(item.refId);
          return { contentType: 'Topic', data: topic };
        } else if (item.contentType === 'Quiz') {
          return { contentType: 'Quiz', quizId: item.refId };
        }
      })
    );

    res.status(200).json({ success: true, sequence: populatedSequence });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

