// AttemptedQuestion.js
const mongoose = require('mongoose');

const attemptedQuestionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'subjects', required: true },
  isAttempted: { type: Boolean, default: false },
});

const AttemptedQns = mongoose.model('attemptedSubjects', attemptedQuestionSchema);
module.exports = AttemptedQns;

