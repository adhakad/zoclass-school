const mongoose = require('mongoose');
const AdmitCardStructureModel = mongoose.model('admitCardStructure', {
  class: { type: Number }, // 12th
  examType:{type:String}, // final exam
  examTheoryMaxMarks:{}, // hindi:100
  examPracticalMaxMarks:{}, // 
  examTheoryMinPassMarks: {}, // hindi:33
  examPracticalMinPassMarks: {}, // hindi:33
  examGrade: {}, // C:33-59,B:60-79,A:80-89,A+:90-100
});

module.exports = AdmitCardStructureModel;