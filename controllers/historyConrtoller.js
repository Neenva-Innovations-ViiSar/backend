const User = require("../models/User");
const Topic = require("../models/Topic");

async function updateLastVisited(req, res) {
  try {
    const {topicId} = req.body;
    if(!topicId){
      return res.status(400).json({ message: "Topic ID is required" });
    }
    const topic = await Topic.findById(topicId).select("chapterId");
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        lastVisited: {
          chapterId: topic.chapterId,
          topicId,
        },
      },
      { new: true }
    ).select("lastVisited");

    res.status(200).json({ success: true, data: user.lastVisited });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getLastVisited(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: "lastVisited.chapterId",
        select: "_id name", // or whatever fields you want
      })
      .populate({
        path: "lastVisited.topicId",
        select: "_id name audioUrl",
      })
      .select("lastVisited");

    if (!user?.lastVisited?.topicId) {
      return res.status(404).json({ message: "No recent activity found." });
    }

    res.status(200).json({ success: true, data: user.lastVisited });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


module.exports = { updateLastVisited, getLastVisited };
