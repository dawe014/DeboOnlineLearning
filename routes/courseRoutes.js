const express = require('express');
const courseController = require('../controllers/courseController');
const protect = require('../middlewares/authMiddleware'); // Your protect middleware
const roleCheck = require('../middlewares/roleMiddleware');
const { uploadCoverImage } = require('../utils/multer');

const router = express.Router();

router
  .route('/')
  .get(courseController.getAllCourses) // Get all courses
  .post(
    protect,
    roleCheck('admin', 'instructor'),
    courseController.createCourse,
  ); // Create a new course

router
  .route('/:id')
  .get(courseController.getCourse) // Get a specific course by ID
  .patch(
    protect,
    uploadCoverImage.single('coverImage'),
    roleCheck('admin', 'instructor'),
    courseController.updateCourse,
  ) // Update a course
  .delete(
    protect,
    roleCheck('admin', 'instructor'),
    courseController.deleteCourse,
  ); // Delete a course

module.exports = router;
