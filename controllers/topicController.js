const Topic = require("../models/Topic");

// Create a new topic under a level
const createTopic = async (req, res) => {
  try {
    const { name, levelId, audioUrl, sequence, lang } = req.body;

    if (!name || !levelId || !audioUrl || sequence === undefined || !lang) {
      return res
        .status(400)
        .json({ message: "Name, Level ID, audio URL, sequence, and language are required" });
    }

    const newTopic = new Topic({
      name,
      levelId,
      audioUrl,
      lang,
      sequence,
    });

    await newTopic.save();

    res.status(201).json({ success: true, data: newTopic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all topics under a specific level
const getTopicsByLevel = async (req, res) => {
  try {
    const { levelId } = req.params;

    const topics = await Topic.find({ levelId }).sort({ sequence: 1 });

    res.status(200).json({ success: true, data: topics });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTopic, getTopicsByLevel };
