const ExamResultStructureModel = require('../models/exam-result-structure');
const ExamResultModel = require('../models/exam-result');
const StudentModel = require('../models/student');

let GetSingleStudentExamResult = async (req, res, next) => {
    let { admissionNo, rollNumber } = req.body;
    let className = req.body.class;

    try {
        let student = await StudentModel.findOne({ admissionNo: admissionNo, class: className, rollNumber: rollNumber }, 'admissionNo name rollNumber class fatherName motherName stream');
        if (!student) {
            return res.status(404).json({ errorMsg: 'Exam result not found' });
        }
        let studentId = student._id;
        let stream = student.stream;
        if (stream === "stream") {
            stream = "N/A";
        }
        // let examResultStr = await ExamResultStructureModel.findOne({ class: className, stream: stream });
        // if (!examResultStr) {
        //     return res.status(404).json({ errorMsg: 'This class any exam not found' });
        // }
        let examResult = await ExamResultModel.findOne({ studentId: studentId })
        if (!examResult) {
            return res.status(404).json({ errorMsg: 'Exam result not found' });
        }
        let examType = await examResult.examType;
        let examResultStructure = await ExamResultStructureModel.findOne({ class: className, examType: examType, stream: stream });
        if (!examResultStructure) {
            return res.status(404).json({ errorMsg: 'This class any exam not found' });
        }
        return res.status(200).json({ examResultStructure: examResultStructure, examResult: examResult, studentInfo: student });
    } catch (error) {
        console.log(error)
    }
}
let GetSingleStudentExamResultById = async (req, res, next) => {
    let studentId = req.params.id;
    try {
        let student = await StudentModel.findOne({ _id: studentId }, 'admissionNo name rollNumber class fatherName motherName stream');
        if (!student) {
            return res.status(404).json({ errorMsg: 'Student not found' });
        }
        let stream = student.stream;
        let className = student.class;
        if (stream === "stream") {
            stream = "N/A";
        }
        let examResultStr = await ExamResultStructureModel.findOne({ class: className, stream: stream });
        if (!examResultStr) {
            return res.status(404).json({ errorMsg: 'This class any exam not found' });
        }
        let examResult = await ExamResultModel.findOne({ studentId: studentId });
        if (!examResult) {
            return res.status(404).json({ errorMsg: 'Exam result not found' });
        }
        let examType = await examResult.examType;
        let examResultStructure = await ExamResultStructureModel.findOne({ class: className, examType: examType });
        if (!examResultStructure) {
            return res.status(404).json({ errorMsg: 'This class any exam not found' });
        }
        return res.status(200).json({ examResultStructure: examResultStructure, examResult: examResult, studentInfo: student });
    } catch (error) {
        console.log(error)
    }
}
let GetAllStudentExamResultByClass = async (req, res, next) => {
    let className = req.params.id;
    try {
        const student = await StudentModel.find({ class: className });
        if (!student) {
            return res.status(404).json({ errorMsg: 'This class any student not found' });
        }
        const examResult = await ExamResultModel.find({ class: className });
        if (!examResult) {
            return res.status(404).json({ errorMsg: 'This class exam result not found' });
        }
        return res.status(200).json({ examResultInfo: examResult, studentInfo: student });
    } catch (error) {
        console.log(error);
    }
}

// let GetExamResultPagination = async (req, res, next) => {
//     let className = req.body.class;
//     let searchText = req.body.filters.searchText;
//     let searchObj = {};
//     if (searchText) {
//         searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText)
//             ? {
//                 $or: [{ rollNumber: searchText }],
//             }
//             : { studentName: new RegExp(`${searchText.toString().trim()}`, 'i') };
//     }

//     try {
//         let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
//         let page = req.body.page || 1;
//         const examResultList = await ExamResultModel.find({ class: className }).find(searchObj)
//             .limit(limit * 1)
//             .skip((page - 1) * limit)
//             .exec();
//         const countExamResult = await ExamResultModel.count();

//         let examResultData = { countExamResult: 0 };
//         examResultData.examResultList = examResultList;
//         examResultData.countExamResult = countExamResult;
//         return res.json(examResultData);
//     } catch (error) {
//         console.log(error);
//     }
// }

let CreateExamResult = async (req, res, next) => {
    let className = req.body.class;
    let { rollNumber, examType, stream } = req.body;
    let { theoryMarks, practicalMarks } = req.body.type;
    if (stream === "stream") {
        stream = "N/A";
    }
    try {
        const student = await StudentModel.findOne({ rollNumber: rollNumber, class: className, stream: stream });
        if (!student) {
            return res.status(404).json(`Roll number ${rollNumber} is invailid !`);
        }
        let studentId = student._id;
        const checkResultStr = await ExamResultStructureModel.findOne({ class: className, examType: examType, stream: stream });
        if (!checkResultStr) {
            return res.status(404).json(`${examType} exam not found`);
        }
        const resultExist = await ExamResultModel.findOne({ studentId: studentId, class: className });
        if (resultExist) {
            return res.status(400).json(`Roll number ${rollNumber} result already exist`);
        }
        let examResultData = {
            studentId: studentId,
            examType: examType,
            class: className,
            theoryMarks: theoryMarks,
        }
        if (practicalMarks) {
            examResultData.practicalMarks = practicalMarks;
        }
        let createExamResult = await ExamResultModel.create(examResultData);
        return res.status(200).json('Student exam result add successfully');

    } catch (error) {
        console.log(error);
    }
}

let CreateBulkExamResult = async (req, res, next) => {
    let { examType, stream } = req.body;
    let className = req.body.bulkResult[0].Class
    if (stream === "stream") {
        stream = "N/A";
    }
    let result = [];
    let newClsRollNumber = [];
    result = req.body.bulkResult.map(entry => {
        const rollNumber = entry['Roll Number'];
        newClsRollNumber.push(rollNumber);
        const studentClass = entry.Class;
        const theoryMarks = [];
        const practicalMarks = [];
        for (const subject in entry) {
            if (subject !== 'Roll Number' && subject !== 'Class') {
                const marks = entry[subject];
                const modifiedSubject = subject.replace(' Practical', '');
                const marksEntry = { [modifiedSubject]: marks };

                if (subject.includes('Practical')) {
                    practicalMarks.push(marksEntry);
                } else {
                    theoryMarks.push(marksEntry);
                }
            }
        }
        const resultEntry = {
            examType: examType,
            class: studentClass,
            theoryMarks: theoryMarks
        };
        if (practicalMarks.length > 0) {
            resultEntry.practicalMarks = practicalMarks;
        }
        return resultEntry;
    });

    try {
        const students = await StudentModel.find({ 'rollNumber': { $in: newClsRollNumber }, class: className }, '_id rollNumber');
        if (students.length == 0) {
            return res.status(404).json(`Invalid all roll number`);
        }
        if (newClsRollNumber.length > students.length) {
            let studentRollNumber = [];
            for (let i = 0; i < students.length; i++) {
                studentRollNumber.push(students[i].rollNumber);
            }
            let invalidRollNumber = newClsRollNumber.filter((rollNumber1) => studentRollNumber.some((rollNumber2) => rollNumber1 !== rollNumber2))
            let spreadRollNumber = invalidRollNumber.join(' , ');
            return res.status(404).json(`Roll number ${spreadRollNumber} is invalid !`);
        }
        let newClsStudentId = [];
        for (let i = 0; i < result.length; i++) {
            let objId = students[i]._id.toString();
            newClsStudentId.push(objId);
            result[i].studentId = objId;
        }
        let existingItems = await ExamResultModel.find({ class: className }).lean();
        let existingClsStudentId = existingItems.map(item => item.studentId);
        let existStudentId = existingClsStudentId.filter((studentId1) => newClsStudentId.some((studentId2) => studentId1 === studentId2))
        if (existStudentId.length > 0) {
            const student = await StudentModel.find({
                '_id': { $in: existStudentId },
                class: className
            }, 'rollNumber');
            let existRollNumber = [];
            for (let i = 0; i < student.length; i++) {
                existRollNumber.push(student[i].rollNumber);
            }
            if (existRollNumber.length > 0) {
                let spreadRollNumber = existRollNumber.join(' , ');
                return res.status(400).json(`Roll number  ${spreadRollNumber} result already exist !`);
            }

        }
        const checkResultStr = await ExamResultStructureModel.findOne({ class: className, examType: examType, stream: stream });
        if (!checkResultStr) {
            return res.status(404).json(`${examType} exam not found`);
        }
        let createExamResult = await ExamResultModel.create(result);
        return res.status(200).json('Student exam result add successfully');

    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    GetSingleStudentExamResult,
    GetSingleStudentExamResultById,
    GetAllStudentExamResultByClass,
    CreateExamResult,
    CreateBulkExamResult
}