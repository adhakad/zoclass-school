const mongoose = require('mongoose');
const ExamResultModel = mongoose.model('exam-result', {
  rollNumber: { type: Number },
  class: { type: Number },
  resultNo: { type: Number },
  examType: { type: String },
  stream: { type: String },
  theoryMarks: {},
  practicalMarks: {},
});

module.exports = ExamResultModel;