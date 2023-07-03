const mongoose = require('mongoose');
const FeesModel = mongoose.model('fees-structure', {
  class: { type: Number },
  totalFees: { type: Number },
  // stallmentOne:{type:Number},
  // stallmentTwo:{type:Number},
  // stallmentThree:{type:Number},
  feesType: {},
  // year: { type: String },
  // feesDueDate: { dateOne: { type: Number }, dateTwo: { type: Number }, dateThree: { type: Number } }
});

module.exports = FeesModel;