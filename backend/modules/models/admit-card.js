const mongoose = require('mongoose');
const AdmitCardModel = mongoose.model('result', {
  rollNumber: { type: Number },
  class: { type: Number },
  examId:{type:String}
});

module.exports = AdmitCardModel;