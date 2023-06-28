const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let userAnswerSave = new Schema({
  questionNo: {type: Number },
  selectAnswer: {type: Number },
  ansId: {type:Number},
}, {
  collection: 'userAnswerSave'
})
 
module.exports = mongoose.model('userAnswerSave', userAnswerSave)