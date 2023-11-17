'use strict';
const mongoose = require('mongoose');
const FeesCollectionModel = mongoose.model('fees-collection', {
  studentId: { type: String },
  class: { type: Number },
  admissionFees: { type: Number, default: 0 },
  admissionFeesPayable: { type: Boolean },
  admissionFeesReceiptNo: { type: Number, default: 0 },
  admissionFeesPaymentDate: { type: String, default: 'empty' },
  totalFees: { type: Number },
  paidFees: { type: Number },
  dueFees: { type: Number },
  installment: {},
  receipt: {},
  paymentDate: {}
});

module.exports = FeesCollectionModel;