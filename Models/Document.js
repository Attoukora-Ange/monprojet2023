const mongoose = require("mongoose");

const DocumentSchema = mongoose.Schema({
  typeFichier: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
  },
  titreDocument: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  fichierDocument: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  dateDocument: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("FichierDocument", DocumentSchema);
