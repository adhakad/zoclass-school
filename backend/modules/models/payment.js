const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  // Add more fields as needed
});

module.exports = mongoose.model('Payment', paymentSchema);