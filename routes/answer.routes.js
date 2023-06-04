const express = require('express');
const { createAnswer, getScore } = require('../controllers/answerController');
const { protect } = require('../middleware/protect');
const router = express.Router();

router.get('/score', protect, getScore);

router.post('/:questionId', protect, createAnswer);

module.exports = router;
