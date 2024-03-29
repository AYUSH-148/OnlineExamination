// AttemptedQuestion.js
const mongoose = require('mongoose');

const marksPerQnSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'subjects', required: true },
    question: {type: mongoose.Schema.Types.ObjectId, ref: 'questions', required: true},
    marks: {type: Number,required:true, default:0},
    max_marks: {type: Number,required:true}
});

const marks = mongoose.model('marksPerQn', marksPerQnSchema);
module.exports = marks;

