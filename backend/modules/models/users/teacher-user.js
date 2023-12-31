'use strict';
const mongoose = require('mongoose');

const TeacherUserModel = mongoose.model('teacher-user', {
    teacherId: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});

module.exports = TeacherUserModel;