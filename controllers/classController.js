const Class = require("../models/Class");

const createClass = async (req, res) => {
  try {
    const { name } = req.body;
    const newClass = new Class({ name });
    await newClass.save();
    res.status(201).json({ success: true, data: newClass });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json({ success: true, data: classes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createClass, getAllClasses };
