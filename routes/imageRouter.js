const express = require('express');
const path = require('path');

const router = express.Router();

router.use('/', express.static(path.join(__dirname, '../uploads')));

module.exports = router;
