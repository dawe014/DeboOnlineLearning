const express = require('express');

const router = express.Router();
const certificateController = require('../controllers/certificateController');
const protect = require('../middlewares/authMiddleware');

// Define route for generating a certificate
router
  .route('/:courseId')
  .get(protect, certificateController.getCertificateDetails);

module.exports = router;
