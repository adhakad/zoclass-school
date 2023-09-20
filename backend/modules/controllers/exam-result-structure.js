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

let GetSingleClassExamResultStructureByStream = async (req, res, next) => {
    let className = req.params.class;
    let stream = req.params.stream;
    let examType = req.params.exam;
    if(stream==="stream"){
        stream = "N/A";
    }
    let streamMsg = `${stream} stream`;
    try {
        const singleExamResultStructureStr = await ExamResultStructureModel.findOne({ class: className,stream:stream,examType:examType });
        if(!singleExamResultStructureStr){
            if(stream==="N/A"){
                
                streamMsg = ``;
            }
            return res.status(404).json(`Class ${className} ${streamMsg} ${examType} exam not found`);
        }
        return res.status(200).json(singleExamResultStructureStr);
    } catch (error) {
        console.log(error);
    }
}

let CreateExamResultStructure = async (req, res, next) => {
    let className = req.body.class;
    let { examType, stream } = req.body;
    let { theoryMaxMarks, theoryPassMarks, practicalMaxMarks, practicalPassMarks, gradeMinMarks, gradeMaxMarks } = req.body.type;
    if(stream==="stream"){
        stream = "N/A";
    }
    try {
        const checkExamExist = await ExamResultStructureModel.findOne({ class: className, examType: examType, stream: stream });
        if (checkExamExist) {
            return res.status(400).json(`This class ${examType} exam structure already exist`);
        }
        let examResultStructureData = { 
            class: className,
            examType: examType,
            stream: stream,
            theoryMaxMarks: theoryMaxMarks,
            theoryPassMarks: theoryPassMarks,
        };
        if (practicalMaxMarks) {
            examResultStructureData.practicalMaxMarks = practicalMaxMarks;
            examResultStructureData.practicalPassMarks = practicalPassMarks;
        }
        if (gradeMaxMarks) {
            examResultStructureData.gradeMinMarks = gradeMinMarks;
            examResultStructureData.gradeMaxMarks = gradeMaxMarks;
        }

        let examResultStructure = await ExamResultStructureModel.create(examResultStructureData);

        return res.status(200).json('Exam result structure structure add successfuly');

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    GetSingleClassExamResultStructure,
    GetSingleClassExamResultStructureByStream,
    CreateExamResultStructure

}