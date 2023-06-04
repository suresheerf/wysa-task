const express = require('express');
const {
  getQuestions,
  getQuestion
} = require('../controllers/questionController');
const router = express.Router();

router.get('/all', getQuestions);

router.get('/:questionId', getQuestion);

module.exports = router;
