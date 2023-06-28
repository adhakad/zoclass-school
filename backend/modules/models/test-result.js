const mongoose = require('mongoose');

const TestResultModel = mongoose.model('test-result', {
    studentId: { type: String },
    testId: { type: String },
    subjectId: {type:String},
    correctAnswer: { type: Number },
    inCorrectAnswer: { type: Number },
    unAttempted: { type: Number },
    createdDate:{type:Number},

});

module.exports = TestResultModel;