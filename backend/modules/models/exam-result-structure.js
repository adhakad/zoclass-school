const mongoose = require('mongoose');
const ExamResultStructureModel = mongoose.model('examResultStructure', {
  class: { type: Number },
  examType:{type:String},
  theoryMaxMarks:{},
  theoryPassMarks: {},
  practicalMaxMarks:{},
  practicalPassMarks: {},
  gradeMinMarks: {},
  gradeMaxMarks: {},
});

module.exports = ExamResultStructureModel;