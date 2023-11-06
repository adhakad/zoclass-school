const mongoose = require('mongoose');

const AdmissionEnquiryModel = mongoose.model('admission-enquiry', {
    session: { type: String },
    name: { type: String },
    class: { type: Number },
    stream: { type: String },
    dob: { type: String },
    doae: { type: String },
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
    status:{
        type:String,
        enum:['Panding','Complete'],
        default:'Panding',
    },
});
module.exports = AdmissionEnquiryModel;