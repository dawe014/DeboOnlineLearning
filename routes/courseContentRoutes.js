const express = require('express');
const courseContentController = require('../controllers/courseContentController');
const protect = require('../middlewares/authMiddleware'); // Your protect middleware
const roleCheck = require('../middlewares/roleMiddleware');

const router = express.Router();

router.route('/').get(protect, courseContentController.getAllContents); // Get all course contents

router
  .route('/:id/content')
  .post(
    protect,
    roleCheck(['admin', 'instructor']),
    courseContentController.createContent,
  ); // Create new content

router
  .route('/:id')
  .get(protect, courseContentController.getContent) // Get specific content by ID
  .patch(
    protect,
    roleCheck(['admin', 'instructor']),
    courseContentController.updateContent,
  ) // Update content
  .delete(
    protect,
    roleCheck(['admin', 'instructor']),
    courseContentController.deleteContent,
  ); // Delete content

module.exports = router;
