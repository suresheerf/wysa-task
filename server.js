const { PORT, DBURI } = require('./config/config');
const mongoose = require('mongoose');
const app = require('./app');
const Question = require('./models/question.model');
const fs = require('fs');

const server = app.listen(PORT, (err) => {
  if (!err) {
    console.log(`server listening on port ${PORT}`);
  }
});
mongoose
  .connect(DBURI)
  .then(async () => {
    console.log('DB connection succesfull');
    const questions = await Question.find();
    if (questions.length === 0) {
      const questions = JSON.parse(
        fs.readFileSync('./content/questions.json', {
          encoding: 'utf-8'
        })
      );
      console.log(questions);
      await Question.create(questions);
    }
  })
  .catch((err) => {
    console.log('Error:', err);
  });
process.on('unhandledRejection', () => {
  console.log('unhandledRejection');
});
