const AdmitCardStructureModel = require("../models/admit-card-structure");
const AdmitCardModel = require("../models/admit-card");
const StudentModel = require('../models/student');

let GetSingleStudentAdmitCard = async(req,res,next) => {
    let {admissionNo,rollNumber} = req.body;
    let className = req.body.class;

    try {
        let student = await StudentModel.findOne({admissionNo:admissionNo,class:className,rollNumber:rollNumber});
        if(!student){
            return res.status(404).json({ errorMsg: 'Admit card not found' });
        }
        let studentId = student._id;
        let stream = student.stream;
        
        let admitCard = await AdmitCardModel.findOne({studentId:studentId});
        if (!admitCard) {
            return res.status(404).json({ errorMsg: 'Admit card not foundd' });
        }
        let admitCardStructure = await AdmitCardStructureModel.findOne({class:className,stream:stream});
        if(!admitCardStructure){
            return res.status(404).json({ errorMsg: 'This class any exam not found' });
        }
        return res.status(200).json({admitCardStructure:admitCardStructure,studentInfo:student,admitCard:admitCard});
    } catch (error) {
        console.log(error)
    }
}
let GetSingleStudentAdmitCardById = async(req,res,next) => {
    let studentId = req.params.id;
    try{
        let admitCard = await AdmitCardModel.findOne({studentId:studentId})
        if (!admitCard) {
            return res.status(404).json({ errorMsg: 'Admit card not found' });
        }
        let stream = admitCard.stream;
        let className = admitCard.class;
        let admitCardStructure = await AdmitCardStructureModel.findOne({class:className,stream:stream});
        if(!admitCardStructure){
            return res.status(404).json({ errorMsg: 'This class any exam not found' });
        }
        return res.status(200).json({admitCardStructure:admitCardStructure,admitCard:admitCard});
    }catch(error){
        console.log(error);
    }
}

let GetAllStudentAdmitCardByClass = async (req, res, next) => {
    let className = req.params.id;
    try{
        const admitCards = await AdmitCardModel.find({class:className});
        return res.status(200).json(admitCards);
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    GetSingleStudentAdmitCard,
    GetSingleStudentAdmitCardById,
    GetAllStudentAdmitCardByClass,
}