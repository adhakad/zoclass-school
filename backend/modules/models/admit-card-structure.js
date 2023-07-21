const mongoose = require('mongoose');
const AdmitCardStructureModel = mongoose.model('admitCardStructure', {
  class: { type: Number }, // 12th
  examType:{type:String}, // final exam
  examSubject:{}, // [hindi,english] 
  examDate:{},  // [{hindi:15/07/2023},{english:16/07/2023}] 
  examTime: {}, // [{hindi:09:00 AM to 12:00 PM},{english:09:00 AM to 12:00 PM}]
  lastAcceptFees: { type: String } // september
});

module.exports = AdmitCardStructureModel;