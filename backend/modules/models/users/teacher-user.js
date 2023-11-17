'use strict';
const mongoose = require('mongoose');

const TeacherUserModel = mongoose.model('teacher-user', {
    teacherId: { type: String },
    email: { type: String},
    password: { type: String },
});

module.exports = TeacherUserModel;