const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const { verifyToken } = require("../middlewares/authMiddleware");


// Route: POST /:levelId/quizzes/new
router.post('/:levelId/quizzes/new', quizController.addQuiz);

// Route: GET /:levelId/quizzes
router.get('/:levelId/quizzes',verifyToken, quizController.getQuizzes);

// Submit quiz answers and unlock next level if passed
router.post("/:levelId/submit", verifyToken, quizController.submitQuiz);

// Route: DELETE /:levelId/quizzes/:quizId
router.delete('/:levelId/quizzes/:quizId', quizController.deleteQuiz);

router.delete("/", quizController.deleteall);

module.exports = router;
