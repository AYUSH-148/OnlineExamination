// NotesSchema.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'subjects', required: true },
    qn: { type: String, required: true },
    options: [
      { text: { type: String, required: true }, isCorrect: { type: Boolean, required: true } }
    ],
    isAnswered: {type: Boolean, default:false},
    weight:{type: Number, required:true}
  });
  const qns = mongoose.model('questions', questionSchema);
  module.exports = qns;
  