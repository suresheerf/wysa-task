const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    answerType: { type: String, enum: ['string', 'number', 'time'] },
    answer: String
  },
  {
    timestamps: true
  }
);

const Answer = mongoose.model('answer', answerSchema);

module.exports = Answer;
