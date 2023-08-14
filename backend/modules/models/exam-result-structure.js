const mongoose = require('mongoose');
const ExamResultStructureModel = mongoose.model('examResultStructure', {
  class: { type: Number }, // 12th
  examType:{type:String}, // final exam
  theoryMaxMarks:{}, // hindi:100
  theoryPassMarks: {}, // hindi:33
  practicalMaxMarks:{}, // 
  practicalPassMarks: {}, // hindi:33
  examGrade: {}, // C:33-59,B:60-79,A:80-89,A+:90-100
});

module.exports = ExamResultStructureModel;