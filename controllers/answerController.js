const Answer = require('../models/answer.model');
const Question = require('../models/question.model');
const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

module.exports.createAnswer = catchAsync(async (req, res, next) => {
  const question = await Question.findById(req.body.questionId);
  if (!question) {
    return next(new appError('could not find the question', 400));
  }
  const questionObject = {
    questionId: req.body.questionId,
    answerType: req.body.answerType,
    answer: req.body.answer,
    userId: req.user._id
  };

  const answer = await Answer.create(questionObject);

  res.status(201).json({ statsu: 'success', answer });
});

module.exports.getAnswers = catchAsync(async (req, res, next) => {
  const questions = await Answer.find();

  res.status(200).json({ statsu: 'success', questions });
});

module.exports.getScore = catchAsync(async (req, res, next) => {
  const answers = await Answer.find({ userId: req.user._id });
  res.status(200).json({ statsu: 'success', message: 'your score is 86%' });
});
