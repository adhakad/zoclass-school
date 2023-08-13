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
    let { totalExamResultStructure } = req.body;
    let examResultStructureType = req.body.type.examResultStructureType;
    let examResultStructurePayType = req.body.type.examResultStructurePayType;
    let examResultStructureTypeTotal = examResultStructureType.reduce((total, obj) => {
        let value = Object.values(obj)[0];
        return total + value;
    }, 0);
    let examResultStructurePayTypeTotal = examResultStructurePayType.reduce((total, obj) => {
        let value = Object.values(obj)[0];
        return total + value;
    }, 0);

    try {
        const checkClassExist = await classModel.findOne({ class: className });
        if (!checkClassExist) {
            return res.status(404).json('Invalid Class');
        }
        const checkExamResultStructure = await ExamResultStructureModel.findOne({ class: className });
        if (checkExamResultStructure) {
            return res.status(400).json(`Class ${className} examResultStructure structure already exist`);
        }
        if (totalExamResultStructure !== examResultStructureTypeTotal) {
            return res.status(400).json(`Class ${className} total examResultStructure is not equal to all examResultStructure particulars total`);
        }
        if (totalExamResultStructure !== examResultStructurePayTypeTotal) {
            return res.status(400).json(`Class ${className} total examResultStructure is not equal to all examResultStructure stallment total`);
        }


        let examResultStructureData = {
            class: className,
            examType: examType,
            examTheoryMaxMarks:examTheoryMaxMarks,
            examPracticalMaxMarks:examPracticalMaxMarks,
            examTheoryMinPassMarks:examTheoryMinPassMarks,
            examPracticalMinPassMarks:examPracticalMinPassMarks,
            examGrade:examGrade
        }
        let examResultStructure = await ExamResultStructureModel.create(examResultStructureData);
        // console.log(examResultStructure)
        return res.status(200).json('ExamResultStructure structure add successfuly');

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    GetSingleClassExamResultStructure,
    CreateExamResultStructure

}