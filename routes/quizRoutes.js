const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Route: POST /chapters/:chapterId/quizzes
router.post('/:chapterId/quizzes', quizController.addQuiz);

// Route: GET /chapters/:chapterId/quizzes
router.get('/:chapterId/quizzes', quizController.getQuizzes);

// Route: PUT /chapters/:chapterId/quizzes/:quizId
router.put('/:chapterId/quizzes/:quizId', quizController.updateQuiz);

// Route: DELETE /chapters/:chapterId/quizzes/:quizId
router.delete('/:chapterId/quizzes/:quizId', quizController.deleteQuiz);

module.exports = router;
