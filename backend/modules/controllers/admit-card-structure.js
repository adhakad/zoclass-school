const AdmitCardStructureModel = require('../models/admit-card-structure');
const AdmitCardModel = require("../models/admit-card");
const StudentModel = require('../models/student');

let GetSingleClassAdmitCardStructure = async (req, res, next) => {
    let className = req.params.id;
    try {
        const singleAdmitCardStr = await AdmitCardStructureModel.find({ class: className });
        return res.status(200).json(singleAdmitCardStr);
    } catch (error) {
        return res.status(500).json('Internal Server Error');;
    }
}
let CreateAdmitCardStructure = async (req, res, next) => {
    let className = req.body.class;
    let {examType,stream} = req.body;
    let { examDate, startTime, endTime } = req.body.type;
    if(stream==="stream"){
        stream = "N/A";
    }
    let streamMsg = `${stream} stream`;

    try {
        const checkExamExist = await AdmitCardStructureModel.findOne({ class: className,stream:stream });
        if (checkExamExist) {
            if(stream==="N/A"){
                streamMsg = ``;
            }
            return res.status(400).json(`Class ${className} ${streamMsg} exam admit card structure already exist !`);
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
            studentAdmitCardData.push({
                studentId:student._id,
                class:className,
                stream:stream,
                examType: examType,
            });
        }
        let admitCardStructure = await AdmitCardStructureModel.create(admitCardStructureData);
        let studentAdmitCard = await AdmitCardModel.create(studentAdmitCardData);
        if (admitCardStructure && studentAdmitCard) {
            return res.status(200).json('Admit card structure add successfuly');
        }

    } catch (error) {
        return res.status(500).json('Internal Server Error');;
    }
}
let DeleteAdmitCardStructure = async (req, res, next) => {
    try {
        const id = req.params.id;
        const admitCard = await AdmitCardStructureModel.findOne({_id:id});
        const className = admitCard.class;
        const stream = admitCard.stream;
        const examType =admitCard.examType;
        const deleteAdmitCard = await AdmitCardModel.deleteMany({class:className,stream:stream,examType:examType});
        const deleteAdmitCardStructure = await AdmitCardStructureModel.findByIdAndRemove(id);
        if(deleteAdmitCard && deleteAdmitCardStructure){
            return res.status(200).json('Admit card structure delete succesfully');
        }
    } catch (error) {
        return res.status(500).json('Internal Server Error');;
    }
}



module.exports = {
    GetSingleClassAdmitCardStructure,
    CreateAdmitCardStructure,
    DeleteAdmitCardStructure
}