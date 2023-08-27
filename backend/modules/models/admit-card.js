const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdmitCardSchema = new Schema({
  studentId: { type: String },
  admitCardNo: { type: Number }, // 558453
  name: { type: String },
  rollNumber: { type: Number }, // 12345
  class: { type: Number }, // 12th
  examType: { type: String }, // final exam
  stream: { type: String }
});

const AdmitCardModel = mongoose.model('admit-card', AdmitCardSchema);

module.exports = AdmitCardModel;