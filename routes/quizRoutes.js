const express = require('express');
const quizController = require('../controllers/quizController');
const protect = require('../middlewares/authMiddleware'); // Your protect middleware
const roleCheck = require('../middlewares/roleMiddleware');

const router = express.Router();

// Routes for quizzes
router.post(
  '/:id/quiz',
  protect,
  roleCheck(['admin', 'instructor']),
  quizController.createQuiz,
); // Create a new quiz
router.get('/lesson/:lessonId', protect, quizController.getQuizzesByLesson); // Get quizzes for a lesson
router.get('/:id', protect, quizController.getQuiz); // Get a quiz by ID
router.patch(
  '/:id',
  protect,
  roleCheck(['admin', 'instructor']),
  quizController.updateQuiz,
); // Update a quiz
router.delete(
  '/:id',
  protect,
  roleCheck(['admin', 'instructor']),
  quizController.deleteQuiz,
); // Delete a quiz

module.exports = router;
