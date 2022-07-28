const mongoose = require("mongoose");

const PositionSchema = mongoose.Schema({
  positionDisponible: {
    type: String,
    lowercase: true,
    required: true,
    minLength: 3,
    trim: true,
  },
  datePosition: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Position", PositionSchema);
