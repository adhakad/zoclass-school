'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdmitCardSchema = new Schema({
  studentId: { type: String },
  class: { type: Number },
  stream: { type: String },
  examType: { type: String },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
});

const AdmitCardModel = mongoose.model('admit-card', AdmitCardSchema);

module.exports = AdmitCardModel;