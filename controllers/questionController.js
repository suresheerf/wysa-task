const mongoose = require('mongoose');
const Questions = require('../models/question.model');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

module.exports.getQuestions = catchAsync(async (req, res, next) => {
  const questions = await Questions.find();

  res.status(200).json({ statsu: 'success', questions });
});

module.exports.getQuestion = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.questionId)) {
    return next(new appError('Please pass valid question id', 400));
  }
  const question = await Questions.findById(req.params.questionId);

  res.status(200).json({ statsu: 'success', question });
});

module.exports.createQuestion = catchAsync(async (req, res, next) => {
  const questionObject = {
    question: req.body.question,
    answerType: req.body.answerType
  };

  if (req.body.answerType === 'mcq') {
    questionObject.choices = [];
    req.body.choices.forEach((item) => {
      questionObject.choices.push({ choice: item });
    });
  }

  const question = await Questions.create(questionObject);
  res.status(201).json({ statsu: 'success', question });
});
