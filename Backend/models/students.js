// NotesSchema.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rollNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default:"student" }, 
});

const stds = mongoose.model('students',studentSchema);
module.exports = stds;
