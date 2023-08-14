const ExamResultStructureModel = require('../models/exam-result-structure');
const classModel = require('../models/class');


let GetSingleClassExamResultStructure = async (req, res, next) => {
    let className = req.params.id;
    try {
        const singleExamResultStructureStr = await ExamResultStructureModel.findOne({ class: className });
        return res.status(200).json(singleExamResultStructureStr);
    } catch (error) {
        console.log(error);
    }
}

let CreateExamResultStructure = async (req, res, next) => {
    let className = req.body.class;
    let examType = req.body.examType;
    let { theoryMaxMarks, theoryPassMarks, practicalMaxMarks, practicalPassMarks} = req.body.type;
    try {
        const checkExamExist = await ExamResultStructureModel.findOne({ class: className, examType: examType });
        if (checkExamExist) {
            return res.status(404).json(`This class ${examType} exam structure already exist`);
        }

        let examResultStructureData = {
            class: className,
            examType: examType,
            theoryMaxMarks:theoryMaxMarks,
            theoryPassMarks:theoryPassMarks,
            practicalMaxMarks:practicalMaxMarks,
            practicalPassMarks:practicalPassMarks,
            // examGrade:examGrade
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