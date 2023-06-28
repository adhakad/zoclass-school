const TestResultModel = require('../models/test-result');
const StudentModel = require('../models/student');

let GetSingleStudentTestResult = async(req,res,next) => {
    let testId = req.params.testId;
    let studentId = req.params.id;
    let testResult = await TestResultModel.findOne({studentId:studentId,testId:testId});
    if(!testResult){
        return res.status(404).json("Test results not found")
    }
    return res.status(200).json(testResult);
}
let GetStudentSubjectTestResults = async(req,res,next) => {
    let subjectId = req.params.subjectId;
    let studentId = req.params.id;
    let testResult = await TestResultModel.find({studentId:studentId,subjectId:subjectId});
    if(!testResult){
        return res.status(404).json("Test results not found")
    }
    return res.status(200).json(testResult);
}
let GetStudentResult = async (req, res, next) => {
    let studentId = req.params.id;
    let studentResult = await TestResultModel.find({ studentId: studentId });
    return res.status(200).json({ studentResult });
}
let GetSingleStudentAllResult = async(req,res,next) => {
    let studentId = req.params.id;
    let studentResults = await TestResultModel.find({studentId:studentId});
    if(!studentResults){
        return res.status(404).json("Student test results not exist")
    }
    let studentInfo = await StudentModel.findOne({_id:studentId});
    return res.status(200).json({studentResults,studentInfo});
}
let GetSingleTestAllResults = async (req, res, next) => {
    let testId = req.params.id;
    let checkTest = await TestResultModel.findOne({ testId: testId });
    if (!checkTest) {
        return res.status(404).json("Test results not exist");
    }
    let testResults = await TestResultModel.find({ testId: testId });
    let studentsInfo = []

    for (let i = 0; i < testResults.length; i++) {
        let count = i + 1;
        let studentId = testResults[i].studentId;
        let student = await StudentModel.findOne({ _id: studentId });

        let studentData = {
            studentId: testResults[i].studentId,
            testId: testResults[i].testId,
            name: student.name,
            class: student.class,
            rollNumber: student.rollNumber,
            correctAnswer: testResults[i].correctAnswer,
            inCorrectAnswer: testResults[i].inCorrectAnswer,
            unAttempted: testResults[i].unAttempted


        };
        studentsInfo.push(studentData)
        if (testResults.length == count) {
            return res.status(200).json(studentsInfo);
        }
    }
}
let CreateTestResult = async (req, res, next) => {
    let nowTime = Math.floor(new Date().getTime()/1000)
    let { studentId, testId, correctAnswer, inCorrectAnswer, unAttempted,subjectId } = req.body;
    let testResultData = {
        studentId: studentId,
        testId: testId,
        subjectId:subjectId,
        correctAnswer: correctAnswer,
        inCorrectAnswer: inCorrectAnswer,
        unAttempted: unAttempted,
        createdDate:nowTime
    }
    try {
        let resultExist = await TestResultModel.findOne({ studentId: studentId, testId: testId });
        if (resultExist) {
            return res.status(400).json("This test already exist");
        }
        let createTestResult = await TestResultModel.create(testResultData);
        return res.status(200).json('TestResult add succesfully');
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    GetSingleStudentTestResult,
    GetStudentSubjectTestResults,
    GetStudentResult,
    GetSingleStudentAllResult,
    GetSingleTestAllResults,
    CreateTestResult,
}