const ExamResultStructureModel = require('../models/exam-result-structure');
const classModel = require('../models/class');


let GetSingleClassExamResultStructure = async (req, res, next) => {
    let className = req.params.id;
    try {
        const singleExamResultStructureStr = await ExamResultStructureModel.find({ class: className });
        return res.status(200).json(singleExamResultStructureStr);
    } catch (error) {
        console.log(error);
    }
}

let CreateExamResultStructure = async (req, res, next) => {
    let className = req.body.class;
    let { examType, stream } = req.body;
    let { theoryMaxMarks, theoryPassMarks, practicalMaxMarks, practicalPassMarks, gradeMinMarks, gradeMaxMarks } = req.body.type;
    try {
        const checkExamExist = await ExamResultStructureModel.findOne({ class: className, examType: examType, stream: stream });
        if (checkExamExist) {
            return res.status(400).json(`This class ${examType} exam structure already exist`);
        }
        let examResultStructureData;
        if (practicalMaxMarks && !gradeMaxMarks) {
            examResultStructureData = {
                class: className,
                examType: examType,
                stream: stream,
                theoryMaxMarks: theoryMaxMarks,
                theoryPassMarks: theoryPassMarks,
                practicalMaxMarks: practicalMaxMarks,
                practicalPassMarks: practicalPassMarks,
            }
        }
        if (!practicalMaxMarks && gradeMaxMarks) {
            examResultStructureData = {
                class: className,
                examType: examType,
                stream: stream,
                theoryMaxMarks: theoryMaxMarks,
                theoryPassMarks: theoryPassMarks,
                gradeMinMarks: gradeMinMarks,
                gradeMaxMarks: gradeMaxMarks,
            }
        }
        if (practicalMaxMarks && gradeMaxMarks) {
            examResultStructureData = {
                class: className,
                examType: examType,
                stream: stream,
                theoryMaxMarks: theoryMaxMarks,
                theoryPassMarks: theoryPassMarks,
                practicalMaxMarks: practicalMaxMarks,
                practicalPassMarks: practicalPassMarks,
                gradeMinMarks: gradeMinMarks,
                gradeMaxMarks: gradeMaxMarks,
            }
        }
        if (!practicalMaxMarks && !gradeMaxMarks) {
            examResultStructureData = {
                class: className,
                examType: examType,
                stream: stream,
                theoryMaxMarks: theoryMaxMarks,
                theoryPassMarks: theoryPassMarks,
            }
        }
        let examResultStructure = await ExamResultStructureModel.create(examResultStructureData);

        return res.status(200).json('Exam result structure structure add successfuly');

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    GetSingleClassExamResultStructure,
    CreateExamResultStructure

}