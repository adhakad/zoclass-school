const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
    trim: true,
  },
  affiliationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  schoolCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  foundedYear: {
    type: Number,
  },
  board: {
    type: String,
    trim: true,
  },
  medium: {
    type: String,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    default: 'India',
  },
  pinCode: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;