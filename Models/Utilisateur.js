const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  nom: {
    type: String,
    lowercase: true,
    required: true,
    minLength: 3,
    maxLength: 255,
    trim: true,
  },
  prenom: {
    type: String,
    lowercase: true,
    required: true,
    minLength: 3,
    maxLength: 255,
    trim: true,
  },
  dateNaissance: {
    type: String,
  },
  sexe: {
    type: String,
  },
  lieuHabitation: {
    type: String,
    lowercase: true,
    required: true,
    maxLength: 255,
    trim: true,
  },
  lieuTravail: {
    type: String,
    lowercase: true,
    required: true,
    maxLength: 255,
    trim: true,
  },
  niveau: {
    type: String,
    lowercase: true,
    required: true,
    maxLength: 255,
  },
  telephone: {
    type: String,
    required: true,
    maxLength: 10,
    minLength: 10,
    trim: true,
  },
  promotion: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    maxLength: 255,
  },
  password: {
    type: String,
    required: true,
    maxLength: 1024,
    minLength: 6,
    trim: true,
  },
  nombreVisite:{
    type: Number,
    trim: true,
  },
  admin:{
    type: Boolean,
    required: true,
  },
  utilisateur:{
    type: Boolean,
    required: true,
  },
  verification: {
    type: String,
    trim: true,
  },
  active: {
    type: Boolean,
    trim: true,
  },
  PasseGenere:{
    type: String,
    trim: true,
  },
  dateInscription: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Utilisateur", UserSchema);
