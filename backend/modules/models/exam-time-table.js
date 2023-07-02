const mongoose = require('mongoose');
const ExamTimeTableModel = mongoose.model('result', {
  examType: { type: String},
  class: { type: Number },
  year:{type:Number},
  subject:{type:String},
  timing:{type:Number},
  duration:{type:Number},
});

module.exports = ExamTimeTableModel;