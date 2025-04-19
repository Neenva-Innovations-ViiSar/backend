const Topic = require("../models/Topic");

const createTopic = async (req, res) => {
  try {
    const { name, chapterId, audioUrl, sequence, lang } = req.body;

    if (!name || !chapterId || !audioUrl || sequence === undefined || !lang) {
      return res
        .status(400)
        .json({ message: "Name, Chapter ID, audio URL, and sequence are required" });
    }

    const newTopic = new Topic({
      name,
      chapterId,
      audioUrl,
      lang,
      sequence
    });

    await newTopic.save();

    res.status(201).json({ success: true, data: newTopic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getTopicsByChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const topics = await Topic.find({ chapterId }).sort({ sequence: 1 });

    res.status(200).json({ success: true, data: topics });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTopic, getTopicsByChapter };
