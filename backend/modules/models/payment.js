const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  orderId: { type: String, required: true },
  studentId: { type: String, required: true },
  class: { type: Number, required: true },
  rollNumber: { type: Number, required: true },
  feesInstallment: { type: String, required: true },
  feesAmount: { type: Number, required: true },
  currency:{ type: String, required: true },
  status: { type: String, default: 'pending' },
});

module.exports = mongoose.model('Payment', paymentSchema);