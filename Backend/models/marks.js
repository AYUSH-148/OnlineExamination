// AttemptedQuestion.js
const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'subjects', required: true },
    marks: {type: Number, default:0}
});

const marks = mongoose.model('marks', marksSchema);
module.exports = marks;

