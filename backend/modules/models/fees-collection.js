const mongoose = require('mongoose');
const FeesCollectionModel = mongoose.model('fees-collection', {
  studentId: { type: String },
  class: { type: Number },
  admissionFees: { type: Number ,default:0},
  admissionFeesPayable: { type: Boolean },
  totalFees: { type: Number },
  paidFees: { type: Number },
  dueFees: { type: Number },
  installment: {},
  receipt: {},
  paymentDate: {}
});

module.exports = FeesCollectionModel;