const mongoose = require('mongoose');
const FeesCollectionModel = mongoose.model('fees-collection', {
  name:{type:String},
  class: { type: Number },
  rollNumber: { type: Number }, 
  totalFees:{type:Number,default:10000},
  paidFees:{type:Number}, 
  dueFees:{type:Number},
  receipt:{},
  installment:{},
  paymentDate:{}
});

module.exports = FeesCollectionModel;