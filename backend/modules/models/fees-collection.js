const mongoose = require('mongoose');
const FeesCollectionModel = mongoose.model('fees-collection', {
  studentId: { type: String },
  class: { type: Number },
  totalFees: { type: Number },
  paidFees: { type: Number },
  dueFees: { type: Number },
  receipt: {},
  installment: {},
  paymentDate: {}
});

module.exports = FeesCollectionModel;