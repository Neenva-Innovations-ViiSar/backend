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

const deleteChapter = async (req, res) => {
  try {
    const { chapterId } = req.params;

    const deletedChapter = await Chapter.findByIdAndDelete(chapterId);

    if (!deletedChapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    res.status(200).json({ success: true, data: deletedChapter });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteall = async (req, res) => {
  try {
    const deleted = await Chapter.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All subject entries deleted",
      deletedCount: deleted.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = { createChapter, getChapterBySubject, deleteChapter, deleteall };
