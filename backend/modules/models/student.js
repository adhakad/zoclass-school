'use strict';
const mongoose = require('mongoose');

const StudentModel = mongoose.model('student', {
    session: { type: String },
    name: { type: String },
    class: { type: Number },
    admissionNo: { type: Number },
    rollNumber: { type: Number },
    admissionType: { type: String },
    stream: { type: String },
    dob: { type: String },
    doa: { type: String },
    gender: { type: String },
    category: { type: String },
    religion: { type: String },
    nationality: { type: String },
    contact: { type: Number },
    address: { type: String },
    lastSchool: { type: String },
    fatherName: { type: String },
    fatherQualification: { type: String },
    fatherOccupation: { type: String },
    fatherContact: { type: Number },
    fatherAnnualIncome: { type: String },
    motherName: { type: String },
    motherQualification: { type: String },
    motherOccupation: { type: String },
    motherContact: { type: Number },
    motherAnnualIncome: { type: String },
    otp: { type: Number },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
});
module.exports = StudentModel;