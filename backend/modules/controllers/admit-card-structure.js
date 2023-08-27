const AdmitCardStructureModel = require('../models/admit-card-structure');
const AdmitCardModel = require("../models/admit-card");
const StudentModel = require('../models/student');

let GetSingleClassAdmitCardStructure = async (req, res, next) => {
    let className = req.params.id;
    try {
        const singleAdmitCardStr = await AdmitCardStructureModel.find({ class: className });
        return res.status(200).json(singleAdmitCardStr);
    } catch (error) {
        console.log(error);
    }
}
let CreateAdmitCardStructure = async (req, res, next) => {
    let className = req.body.class;
    let {examType,stream} = req.body;
    let { examDate, startTime, endTime } = req.body.type;

    try {
        const checkExamExist = await AdmitCardStructureModel.findOne({ class: className, examType: examType,stream:stream });
        if (checkExamExist) {
            return res.status(404).json(`This class ${examType} exam admit card already created`);
        }
        const checkAdmitCardExist = await AdmitCardModel.findOne({ class: className,stream:stream });
        if (checkAdmitCardExist) {
            return res.status(404).json(`Class ${className} ${stream} stream exam admit card already exist`);
        }
        let admitCardStructureData = {
            class: className,
            examType: examType,
            stream:stream,
            examDate: examDate,
            examStartTime: startTime,
            examEndTime: endTime,
        }
        const studentData = await StudentModel.find({ class: className,stream:stream });

        let studentAdmitCardData = [];
        for (const student of studentData) {
            let admitCardNo = Math.floor(Math.random() * 899999 + 100000);
            studentAdmitCardData.push({
                studentId:student._id,
                admitCardNo: admitCardNo,
                name: student.name,
                class: student.class,
                stream:stream,
                rollNumber: student.rollNumber,
                examType: examType,
            });
        }

        let admitCardStructure = await AdmitCardStructureModel.create(admitCardStructureData);
        let studentAdmitCard = await AdmitCardModel.create(studentAdmitCardData);
        if (admitCardStructure && studentAdmitCard) {
            return res.status(200).json('Admit card structure add successfuly');
        }

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    GetSingleClassAdmitCardStructure,
    CreateAdmitCardStructure
}