// AttemptedQuestion.js
const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'subjects', required: true },
    marks: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }, 
    time: { type: String, default: getTimeString }, 
    count_qns: { type: Number, default: 0 }
});


function getTimeString() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}


const marks = mongoose.model('marks', marksSchema);
module.exports = marks;

