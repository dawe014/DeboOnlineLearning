const express = require('express');
const lessonController = require('../controllers/lessonController');
const protect = require('../middlewares/authMiddleware'); // Your protect middleware
const roleCheck = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/').get(protect, lessonController.getAllLessons); // Get all lessons
router
  .route('/:id/lesson')
  .post(
    protect,
    roleCheck('admin', 'instructor'),
    lessonController.createLesson,
  ); // Create a new lesson

router
  .route('/:id')
  .get(protect, lessonController.getLesson) // Get a specific lesson by ID
  .patch(
    protect,
    roleCheck('admin', 'instructor'),
    lessonController.updateLesson,
  ) // Update a lesson
  .delete(
    protect,
    roleCheck('admin', 'instructor'),
    lessonController.deleteLesson,
  ); // Delete a lesson

module.exports = router;
