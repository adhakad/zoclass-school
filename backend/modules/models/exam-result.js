const mongoose = require('mongoose');
const ExamResultModel = mongoose.model('exam-result', {
  studentId: { type: String },
  class: { type: Number },
  examType: { type: String },
  theoryMarks: {},
  practicalMarks: {},
});

module.exports = ExamResultModel;