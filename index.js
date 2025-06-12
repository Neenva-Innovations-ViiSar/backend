require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./config/db");

// Route imports
const userRoutes = require("./routes/userRoutes");
const classRoutes = require("./routes/classRoutes");
const subjectRoutes = require("./routes/subjectRoutes");
const chapterRoutes = require("./routes/chapterRoutes");
const topicRoutes = require("./routes/topicRoutes");
const historyRoutes = require("./routes/historyRoutes");
const quizRoutes = require("./routes/quizRoutes");
const levelRoutes = require("./routes/levelRoutes");

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/class", classRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/chapter", chapterRoutes);
app.use("/api/topic", topicRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/level", levelRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
