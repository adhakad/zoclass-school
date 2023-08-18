const ExamResultStructureModel = require('../models/exam-result-structure');
const ExamResultModel = require('../models/exam-result');
const StudentModel = require('../models/student');

let GetSingleStudentExamResult = async (req, res, next) => {
    let { resultNo, rollNumber } = req.body;
    let className = req.body.class;

    try {
        let studentInfo = await StudentModel.findOne({ rollNumber: rollNumber, class: className });
        if (!studentInfo) {
            return res.status(404).json(`Roll number not found for class ${className}`);
        }
        let examResultStructure = await ExamResultStructureModel.findOne({ class: className });
        if (!examResultStructure) {
            return res.status(404).json({ errorMsg: 'This class any exam not exist' });
        }
        let examResult = await ExamResultModel.findOne({ resultNo: resultNo, class: className, rollNumber: rollNumber })
        if (!examResult) {
            return res.status(404).json({ errorMsg: 'Admit card not exist' });
        }
        return res.status(200).json({ examResultStructure: examResultStructure, examResult: examResult, studentInfo: studentInfo });
    } catch (error) {
        console.log(error)
    }
}
let GetExamResultPagination = async (req, res, next) => {
    let className = req.body.class;
    let searchText = req.body.filters.searchText;
    let searchObj = {};
    if (searchText) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText)
            ? {
                $or: [{ rollNumber: searchText }],
            }
            : { studentName: new RegExp(`${searchText.toString().trim()}`, 'i') };
    }

    try {
        let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
        let page = req.body.page || 1;
        const examResultList = await ExamResultModel.find({ class: className }).find(searchObj)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const countExamResult = await ExamResultModel.count();

        let examResultData = { countExamResult: 0 };
        examResultData.examResultList = examResultList;
        examResultData.countExamResult = countExamResult;
        return res.json(examResultData);
    } catch (error) {
        console.log(error);
    }
}

let CreateExamResult = async (req, res, next) => {
    let className = req.body.class;
    let { rollNumber, examType } = req.body;
    let resultNo = Math.floor(Math.random() * 899999 + 100000);
    let { theoryMarks, practicalMarks } = req.body.type;

    try {
        // const checkRollNumber = await StudentModel.findOne({rollNumber:rollNumber,class: className});
        // if(!checkRollNumber){
        //     return res.status(404).json("Roll number not found for this class");
        // }
        const resultExist = await ExamResultModel.findOne({ rollNumber: rollNumber, class: className });
        if (resultExist) {
            return res.status(400).json("Result already exist for this roll number");
        }

        let examResultData;
        if (theoryMarks && practicalMarks) {
            examResultData = {
                rollNumber: rollNumber,
                examType: examType,
                class: className,
                resultNo: resultNo,
                theoryMarks: theoryMarks,
                practicalMarks: practicalMarks
            }
        }
        if (theoryMarks && !practicalMarks) {
            examResultData = {
                rollNumber: rollNumber,
                examType: examType,
                class: className,
                resultNo: resultNo,
                theoryMarks: theoryMarks,
            }
        }


        let createExamResult = await ExamResultModel.create(examResultData);
        return res.status(200).json('Student exam result add successfully');

    } catch (error) {
        console.log(error);
    }
}

let CreateBulkExamResult = async (req, res, next) => {
    let examType = req.body.examType;
    let newResult = [];
    let newClsRollNumber = [];
    let result = req.body.bulkResult;
    newResult = result.map(student => {
        const { rollNumber, class: studentClass, ...marks } = student;
        newClsRollNumber.push(rollNumber);
        let resultNo = Math.floor(Math.random() * 899999 + 100000);
        const theoryMarks = [];
        for (const [subject, score] of Object.entries(marks)) {
            theoryMarks.push({ [subject]: score });
        }
        return { examType, rollNumber, class: studentClass, resultNo, theoryMarks };
    });
    try {
        let existingItems = await ExamResultModel.find({ class: req.body.bulkResult[0].class }).lean();
        let existingClsRollNumber = existingItems.map(item => item.rollNumber);
        let existRollnumber = existingClsRollNumber.filter((rollNumber1) => newClsRollNumber.some((rollNumber2) => rollNumber1 === rollNumber2))
        if (existRollnumber.length > 0) {
            return res.status(400).json({ existRollnumber, errMsg: 'Roll number - ' });
        }
        let createExamResult = await ExamResultModel.create(newResult);
        return res.status(200).json('Student exam result add successfully');

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    GetSingleStudentExamResult,
    GetExamResultPagination,
    CreateExamResult,
    CreateBulkExamResult
}