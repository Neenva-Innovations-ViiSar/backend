const Level = require("../models/Level");
const Topic = require("../models/Topic");

// Create a new topic or reel
const createTopic = async (req, res) => {
  try {
    const { name, levelId, lang, type, voiceGiver, sequence } = req.body;
    const audioUrl = req.file.path;

    const contentType = type || "topic";

    if (!name || !audioUrl || !lang) {
      return res
        .status(400)
        .json({ message: "Name, audio URL, and language are required" });
    }

    if (contentType === "topic") {
      if (!levelId || sequence === undefined) {
        return res
          .status(400)
          .json({ message: "Level ID and sequence are required for topics" });
      }
    }

    const newTopic = new Topic({
      name,
      lang,
      audioUrl,
      type: contentType,
      levelId: contentType === "topic" ? levelId : undefined,
      sequence: contentType === "topic" ? sequence : undefined,
      voiceGiver: contentType === "reel" ? voiceGiver : undefined,
    });

    await newTopic.save();

    if (contentType === "topic") {
      await Level.findByIdAndUpdate(levelId, {
        $push: {
          sequence: {
            contentType: "Topic",
            refId: newTopic._id,
          },
        },
      });
    }

    res.status(201).json({ success: true, data: newTopic });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get detail of a topic
const getTopicsByLevel = async (req, res) => {
  try {
    const { levelId } = req.params;

    const topics = await Topic.find({ levelId, type: "topic" }).sort({
      sequence: 1,
    });

    if (!topics || topics.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No topics found for this level" });
    }

    res.status(200).json({ success: true, data: topics });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all reels
const getReels = async (req, res) => {
  try {
    const reels = await Topic.find({ type: "reel" }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: reels });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteall = async (req, res) => {
  try {
    const deleted = await Topic.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All topic entries deleted",
      deletedCount: deleted.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};



module.exports = { createTopic, getTopicsByLevel, getReels, deleteall };
