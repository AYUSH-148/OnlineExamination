// NotesSchema.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    duration: {
        hours: { type: String, default:'00', min: 0 },
        minutes: { type: String, default:'02', min: 0, max: 59 },
        seconds: { type: String, default:'00', min: 0, max: 59 }
    }
});


const sub = mongoose.model('subjects',subjectSchema);
module.exports = sub;
