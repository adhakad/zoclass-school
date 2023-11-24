'use strict';
const mongoose = require('mongoose');

const TeacherModel = mongoose.model('teacher', {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    teacherUserId: {
        type: Number,
        required: true,
        trim: true,
    },
    otp: {
        type: Number,
        required: true,
        trim: true,
    },
    education: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum: ['Active', 'Inactive'],
        default: 'Inactive',
    }
});

module.exports = TeacherModel;