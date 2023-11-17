'use strict';
const mongoose = require('mongoose');

const TeacherModel = mongoose.model('teacher', {
    name: { type: String },
    teacherUserId: { type: Number },
    otp: { type: Number },
    education: { type: String },
    image: { type: String },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Inactive',
    }
});

module.exports = TeacherModel;