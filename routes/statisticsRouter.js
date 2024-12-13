const express = require('express');

const router = express.Router();
const protect = require('../middlewares/authMiddleware');
const {
  getAdminStats,
  getInstructorStats,
} = require('../controllers/statisticsController');
const roleCheck = require('../middlewares/roleMiddleware');

// Define route for generating a certificate
router.route('/').get(protect, roleCheck('admin'), getAdminStats);
router
  .route('/:instructorId')
  .get(protect, roleCheck('admin', 'instructor'), getInstructorStats);

module.exports = router;
