const express = require('express');
const quizSubmissionController = require('../controllers/quizSubmissionController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Submit a quiz
router.post('/', protect, quizSubmissionController.submitQuiz);

// Get submissions for a user
router.get('/user/:userId', quizSubmissionController.getUserSubmissions);

// Get submissions for a quiz
router.get(
  '/quiz/:quizId/:lessonId',
  protect,
  quizSubmissionController.getQuizSubmissions,
);

// Grade a quiz submission
router.post('/grade/:submissionId', quizSubmissionController.gradeQuiz);

module.exports = router;
