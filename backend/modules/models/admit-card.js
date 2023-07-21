const mongoose = require('mongoose');
const AdmitCardModel = mongoose.model('result', {
  enrollmentNo: { type: Number }, // 558453
  rollNumber: { type: Number }, // 12345
  class: { type: Number }, // 12th
  examType: { type: String }, // final exam
});

module.exports = AdmitCardModel;