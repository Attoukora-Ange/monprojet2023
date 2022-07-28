const mongoose = require("mongoose");

const QuestionSchema = mongoose.Schema({
  nomQuestion: {
    type: String,
    lowercase: true,
    required: true,
    minLength: 3,
    maxLength: 255,
    trim: true,
  },
  emailQuestion: {
    type: String,
    required: true,
    index: true,
    trim: true,
    maxLength: 255,
  },
  question: {
    type: String,
    lowercase: true,
    trim: true,
  },
  reponseQuestion: {
    type: String,
    lowercase: true,
    trim: true,
  },
  dateQuestion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Question", QuestionSchema);
