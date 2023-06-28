const mongoose = require('mongoose');

const StudentUserModel = mongoose.model('student-user', {
    studentId: {type: String},
    email:{type:String},
    password:{type:String,select:false},
});

module.exports = StudentUserModel;