const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const paymentController = require('../controllers/paymentController');
const protect = require('../middlewares/authMiddleware'); // Your protect middleware
const roleCheck = require('../middlewares/roleMiddleware');

const router = express.Router();

// Route to enroll a student
router.post('/:id/accept-payment', protect, paymentController.acceptPayment);
router.get('/:id/verify-payment', protect, paymentController.verifyPayment);

// Route to get all courses a student is enrolled in
router.get(
  '/student/:studentId',
  protect,
  roleCheck(['admin', 'instructor']),
  enrollmentController.getStudentEnrollments,
);
// Route to get all curriculum of student
router.get('/myCurriculum', protect, enrollmentController.getMyCurriculum);

// Route to get all students enrolled in a course
router.get(
  '/course/:courseId',
  protect,
  roleCheck(['admin', 'instructor']),
  enrollmentController.getCourseEnrollments,
);

module.exports = router;
