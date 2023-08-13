const mongoose = require('mongoose');
const FeesModel = mongoose.model('fees-structure', {
  class: { type: Number },
  totalFees: { type: Number },
  feesType: {},
  stallment:{}
});

module.exports = FeesModel;