const express = require('express');
const progressController = require('../controllers/progressController');
// const authController = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

// Middleware to protect routes (ensure student is authenticated)
// router.use(authController.protect);

// Route to get the progress of a student in a course
// router.get('/:studentId/course/:courseId', progressController.getProgress);
router
  .route('/:studentId/course/:courseId/progress')
  .get(protect, progressController.getProgress);
router
  .route('/course/:courseId/progress')
  .get(protect, progressController.myProgress);
router
  .route('/course/:courseId')
  .get(protect, progressController.calculateMyProgress);
router
  .route('/:studentId/course/:courseId')
  .get(protect, progressController.calculateProgress);

// Route to update the progress of a student (e.g., mark lesson or content as completed)
router.route('/update').patch(protect, progressController.updateProgress);

// Route to update the quiz score
router.route('/update-quiz').patch(protect, progressController.updateQuizScore);

module.exports = router;
