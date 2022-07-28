const mongoose = require("mongoose");

const VisiteurSchema = mongoose.Schema({
  nombreVisiteurConecte: {
    type: Number,
    trim: true,
  },
  nombreVisiteur: {
    type: Number,
    trim: true,
  },
  dateDerniereVisite: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Visiteur", VisiteurSchema);
