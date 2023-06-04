const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
);

const Question = mongoose.model('question', questionSchema);

module.exports = Question;
