const express = require('express');
const progressController = require('../controllers/progressController');
const authController = require('../controllers/authController');

const router = express.Router();

// Middleware to protect routes (ensure student is authenticated)
router.use(authController.protect);

// Route to get the progress of a student in a course
router.get('/:studentId/course/:courseId', progressController.getProgress);

// Route to update the progress of a student (e.g., mark lesson or content as completed)
router.patch('/update', progressController.updateProgress);

// Route to update the quiz score
router.patch('/update-quiz', progressController.updateQuizScore);

module.exports = router;
