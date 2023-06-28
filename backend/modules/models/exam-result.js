const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let result = new Schema({
    studentName: {type: String},
    rollNumber: {type: Number},
    class: {type: Number},
    subject:[],
    marks:[],
  },{strict:false} ,{
    collection: 'result'
  })
   
  module.exports = mongoose.model('result', result);