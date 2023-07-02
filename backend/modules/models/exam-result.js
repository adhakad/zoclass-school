const mongoose = require('mongoose');
const ExamResultModel = mongoose.model('result', {
  studentName: { type: String },
  rollNumber: { type: Number },
  class: { type: Number },
  subject: [],
  marks: [],
});

module.exports = ExamResultModel;