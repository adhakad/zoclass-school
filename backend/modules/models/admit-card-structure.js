const mongoose = require('mongoose');
const AdmitCardStructureModel = mongoose.model('admitCardStructure', {
  class: { type: Number }, // 12th
  examType:{type:String}, // final exam
  examDate:{},
  examStartTime: {},
  examEndTime: {},
  lastAcceptFees: { type: String } // september
});

module.exports = AdmitCardStructureModel;