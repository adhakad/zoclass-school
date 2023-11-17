'use strict';
const mongoose = require('mongoose');

const ClassSubjectModel = mongoose.model('class-subject', {
    class: { type: Number },
    stream: { type: String },
    subject: {},
});

module.exports = ClassSubjectModel;