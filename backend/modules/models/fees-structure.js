const mongoose = require('mongoose');
const FeesModel = mongoose.model('fees-structure', {
  class: { type: Number },
  // admissionFees:{type:Number},
  totalFees: { type: Number },
  feesType: {},
  installment: {}

});

module.exports = FeesModel;