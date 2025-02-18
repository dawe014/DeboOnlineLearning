const express = require('express');
const progressController = require('../controllers/progressController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();
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

router.route('/update').patch(protect, progressController.updateProgress);

// Route to update the quiz score
router.route('/update-quiz').patch(protect, progressController.updateQuizScore);

module.exports = router;
