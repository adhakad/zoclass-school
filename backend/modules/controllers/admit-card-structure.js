const AdmitCardStructureModel = require('../models/admit-card-structure');
const classModel = require('../models/class');


let CreateAdmitCardStructure = async (req, res, next) => {
    let className = req.body.class;
    let examType = req.body.examType;
    let { examDate, startTime, endTime } = req.body.type;
    
    try {
        const checkExamExist = await AdmitCardStructureModel.findOne({ class: className, examType: examType });
        if (checkExamExist) {
            return res.status(404).json(`This class ${examType} exam admit card already created`);
        }
        let admitCardStructureData = {
            class: className,
            examType: examType,
            examDate: examDate,
            examStartTime: startTime,
            examEndTime: endTime,
        }
        let admitCardStructure = await AdmitCardStructureModel.create(admitCardStructureData);
        if (admitCardStructure) {
            return res.status(200).json('Admit card structure add successfuly');
        }

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    CreateAdmitCardStructure
}