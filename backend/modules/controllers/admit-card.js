const AdmitCardStructureModel = require("../models/admit-card-structure");
const AdmitCardModel = require("../models/admit-card");
const StudentModel = require('../models/student');

let GetSingleStudentAdmitCard = async(req,res,next) => {
    let {admitCardNo,rollNumber} = req.body;
    let className = req.body.class;

    try {
        let admitCardStructure = await AdmitCardStructureModel.findOne({class:className});
        if(!admitCardStructure){
            return res.status(404).json({ errorMsg: 'This class any exam not exist' });
        }
        let admitCard = await AdmitCardModel.findOne({admitCardNo:admitCardNo,class:className,rollNumber:rollNumber})
        if (!admitCard) {
            return res.status(404).json({ errorMsg: 'Admit card not exist' });
        }
        return res.status(200).json({admitCardStructure:admitCardStructure,admitCard:admitCard});
    } catch (error) {
        console.log(error)
    }
}
let GetSingleStudentAdmitCardById = async(req,res,next) => {
    let id = req.params.id;
    try{
        const singleStudentAdmitCard = await AdmitCardModel.findOne({studentId:id});
        return res.status(200).json(singleStudentAdmitCard);
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