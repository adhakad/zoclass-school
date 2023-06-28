const mongoose = require('mongoose');

const ClassSubjectModel = mongoose.model('classSubject', {
    class: {type:Number},
    subject: {type: String},
});

module.exports = ClassSubjectModel;
