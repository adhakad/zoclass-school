const mongoose = require('mongoose');
const AdmitCardStructureModel = mongoose.model('admit-card-structure', {
  class: { type: Number }, // 12th
  examType: { type: String }, // final exam
  stream: { type: String },
  examDate: {},
  examStartTime: {},
  examEndTime: {},
  lastAcceptFees: { type: String }, // september
  admitCardPublishStatus: {
    type: Boolean,
    enum: [true, false],
    default: false,
  }
});

module.exports = AdmitCardStructureModel;