const Subject = require("../models/Subject");
const User = require("../models/User");

const createSubject = async (req, res) => {
  try {
    const { name, classId } = req.body;

    const newSubject = new Subject({ name, classId });
    await newSubject.save();

    res.status(201).json({ success: true, data: newSubject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSubjectsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const subjects = await Subject.find({ classId });

    res.status(200).json({ success: true, data: subjects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createSubject, getSubjectsByClass };
