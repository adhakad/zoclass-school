const mongoose = require('mongoose');
const ExamResultStructureModel = mongoose.model('exam-result-structure', {
  class: { type: Number },
  examType: { type: String },
  stream: { type: String },
  theoryMaxMarks: {},
  theoryPassMarks: {},
  practicalMaxMarks: {},
  practicalPassMarks: {},
  gradeMinMarks: {},
  gradeMaxMarks: {},
});

module.exports = ExamResultStructureModel;