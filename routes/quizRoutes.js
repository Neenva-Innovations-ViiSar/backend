const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Route: POST /:levelId/quizzes/new
router.post('/:levelId/quizzes/new', quizController.addQuiz);

// Route: GET /:levelId/quizzes
router.get('/:levelId/quizzes', quizController.getQuizzes);

// Route: PUT /:levelId/quizzes/:quizId
router.put('/:levelId/quizzes/:quizId', quizController.updateQuiz);

// Route: DELETE /:levelId/quizzes/:quizId
router.delete('/:levelId/quizzes/:quizId', quizController.deleteQuiz);

router.delete("/", quizController.deleteall);

module.exports = router;
