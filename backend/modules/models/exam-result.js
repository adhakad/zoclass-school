const mongoose = require('mongoose');
const ExamResultModel = mongoose.model('result', {
  rollNumber: { type: Number },
  class: { type: Number },
  resultNo: { type: Number },
  examType: { type: String },
  theoryMarks: {},
  practicalMarks: {},
});

module.exports = ExamResultModel;