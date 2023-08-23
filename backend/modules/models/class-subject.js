const mongoose = require('mongoose');

const ClassSubjectModel = mongoose.model('classSubject', {
    class: { type: Number },
    stream: { type: String },
    subject: {},
});

module.exports = ClassSubjectModel;