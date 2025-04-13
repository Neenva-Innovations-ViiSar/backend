const User = require("../models/User");

async function updateLastVisited(req, res) {
  try {
    const { chapterId, subjectId, topicId, audioId } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        lastVisited: { chapterId, subjectId, topicId, audioId  },
      },
      { new: true }
    ).select("-__v");

    res.status(200).json({ success: true, data: user.lastVisited });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getLastVisited(req, res) {
  try {
    const user = await User.findById(req.user.id).select("lastVisited");
    if(!user || !user.lastVisited || !user.lastVisited.subjectId){
        return res.status(404).json({message: "No recent activity found."});
    }
    res.status(200).json({ success: true, data: user.lastVisited });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { updateLastVisited, getLastVisited };
