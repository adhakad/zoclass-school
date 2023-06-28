const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let test = new Schema({
  class: {type: Number },
  subject: {type: String },
  title : {type:String },
  totalQuestion: {type:Number },
  duration: {type:Number },
  startTime:{type:Number},
  endTime:{type:Number},
}, {
  collection: 'test'
})
 
module.exports = mongoose.model('test', test);