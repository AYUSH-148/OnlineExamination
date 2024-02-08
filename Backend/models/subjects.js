// NotesSchema.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

const sub = mongoose.model('subjects',subjectSchema);
module.exports = sub;
