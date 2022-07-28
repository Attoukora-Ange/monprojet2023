const mongoose = require("mongoose");

const MedicamentSchema = mongoose.Schema({
  Medicament: {
    type: [Object],
    lowercase: true,
    required: true,
    trim: true,
  },
  dateMedicament: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Medicament", MedicamentSchema);
