const mongoose = require("mongoose");

const LaboratoireSchema = mongoose.Schema({
  designationExamen: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
  },
  prixExamen: {
    type: String,
    uppercase: true,
    required: true,
    trim: true,
  },

  dateLaboratoire: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Laboratoire", LaboratoireSchema);
