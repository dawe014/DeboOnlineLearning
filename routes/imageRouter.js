const express = require('express');
const path = require('path');

const router = express.Router();

// Serve static files from the uploads folder
router.use('/', express.static(path.join(__dirname, '../uploads'))); // Use correct relative path

module.exports = router;
