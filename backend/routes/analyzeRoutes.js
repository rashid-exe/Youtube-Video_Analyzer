const express = require('express');
const router = express.Router();
const { analyzeVideo, getResult } = require('../controllers/analyzeController');

router.post('/', analyzeVideo);
router.get('/:id', getResult);

module.exports = router;