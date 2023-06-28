const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
let question = new Schema({
  testId: {type:String },
  questionId: {type:Number },
  questionText: {type: String },
  option1: {type: String },
  option2: {type: String },
  option3: {type: String },
  option4: {type: String },
  ansId: {type:Number},

}, {
  collection: 'question'
})
 
module.exports = mongoose.model('question', question)