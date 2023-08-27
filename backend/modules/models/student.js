const mongoose = require('mongoose');

const StudentModel = mongoose.model('student', {
    name: { type: String },
    class: { type: Number },
    stream: { type: String },
    rollNumber: { type: Number },
    otp: { type: Number },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
});
module.exports = StudentModel;