const mongoose = require('mongoose');
const FeesCollectionModel = mongoose.model('fees-collection', {
  class: { type: Number },
  rollNumber: { type: Number }, 
  totalFees:{type:Number,default:10000},
  paidFees:{type:Number}, 
  dueFees:{type:Number},
  stallmentOne:{type:Number,default:0},
  stallmentTwo:{type:Number,default:0},
  stallmentThree:{type:Number,default:0},
});

module.exports = FeesCollectionModel;