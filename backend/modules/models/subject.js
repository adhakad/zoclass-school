'use strict';
const mongoose = require('mongoose');

const SubjectModel = mongoose.model('subject', {
    subject: {type: String},
});

module.exports = SubjectModel;
