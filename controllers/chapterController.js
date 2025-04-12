const Chapter = require("../models/Chapter");

const createChapter = async (req, res) => {
  try {
    const { name, subjectId } = req.body;

    const newChapter = new Chapter({ name, subjectId });
    await newChapter.save();

    res.status(201).json({ success: true, data: newChapter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getChapterBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;

    const chapters = await Chapter.find({ subjectId });

    res.status(200).json({ success: true, data: chapters });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createChapter, getChapterBySubject };
