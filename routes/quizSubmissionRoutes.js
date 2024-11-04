const express = require('express');
const quizSubmissionController = require('../controllers/quizSubmissionController');
const protect = require('../middlewares/authMiddleware'); // Your protect middleware

const router = express.Router();

// Route to submit quiz answers and get the score
router.post('/submit', protect, quizSubmissionController.submitQuiz);

module.exports = router;
