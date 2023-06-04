const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, require: [true, 'Please specifiy question'] },
    questionType: { type: String, enum: ['propt', 'mcq'] },
    answerType: { type: String },
    choices: [String]
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model('question', questionSchema);

module.exports = Question;
