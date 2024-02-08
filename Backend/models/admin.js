// NotesSchema.js
const mongoose = require('mongoose');

const administratorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default:"admin" },   
});

const admin = mongoose.model('admin', administratorSchema);
module.exports = admin;
