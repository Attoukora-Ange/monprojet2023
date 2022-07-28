const mongoose = require("mongoose");

const ConseilSchema = mongoose.Schema({
  titreConseil: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
  },
  contenueConseil: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  auteurConseil: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  dateConseil: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Conseil", ConseilSchema);
