const ExamResultModel = require('../models/exam-result');
const StudentModel = require('../models/student');

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
        const examResultList = await ExamResultModel.find({ class:className }).find(searchObj)
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
    let rollNumber = req.body.rollNumber;
    console.log(req.body.type.options[0].marks)

    try {
        // const checkRollNumber = await StudentModel.findOne({rollNumber:rollNumber,class: className});
        // if(!checkRollNumber){
        //     return res.status(404).json("Roll number not found for this class");
        // }
        const resultExist = await ExamResultModel.findOne({ rollNumber: rollNumber, class: className });
        if (resultExist) {
            return res.status(400).json("Result already exist for this roll number");
        }
        let subjects = [];
        let marks = [];
        for (var i = 0; i < req.body.type.options.length; i++) {
            let subject = req.body.type.options[i].subject;
            let mark = req.body.type.options[i].marks;
            subjects.push(subject);
            marks.push(mark);
        }
        let examResultData = {
            rollNumber: rollNumber,
            class: className,
            subject: subjects,
            marks: marks,

        }
        console.log(examResultData)
        let createExamResult = await ExamResultModel.create(examResultData);
        return res.status(200).json('Student exam result add successfully');

    } catch (error) {
        console.log(error);
    }
}

let CreateBulkExamResult = async (req, res, next) => {
    let newResult = [];
    let newClsRollNumber = [];
    for (let i = 0; i < req.body.length; i++) {
        let Result = [{ rollNumber: req.body[i].rollNumber, class: req.body[i].class, subject: ['Hindi', 'English'], marks: [req.body[i].Hindi, req.body[i].English] }]
        newResult.push(...Result)
        newClsRollNumber.push(req.body[i].rollNumber)
    }

    try {
        let existingItems = await ExamResultModel.find({ class: req.body[0].class }).lean();
        let existingClsRollNumber = existingItems.map(item => item.rollNumber);
        let existRollnumber = existingClsRollNumber.filter((rollNumber1) => newClsRollNumber.some((rollNumber2) => rollNumber1 === rollNumber2))
        if (existRollnumber.length > 0) {
            return res.status(400).json({existRollnumber,errMsg:'Roll number - '});
        }
        let createExamResult = await ExamResultModel.create(newResult);
        return res.status(200).json('Student exam result add successfully');

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    GetExamResultPagination,
    CreateExamResult,
    CreateBulkExamResult
}