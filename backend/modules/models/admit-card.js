const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdmitCardSchema = new Schema({
  studentId: { type: String },
  examType: { type: String },
});

const AdmitCardModel = mongoose.model('admit-card', AdmitCardSchema);

module.exports = AdmitCardModel;