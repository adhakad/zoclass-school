const AdmitCardStructureModel = require("../models/admit-card-structure");
const AdmitCardModel = require("../models/admit-card");
const StudentModel = require('../models/student');

let GetSingleStudentAdmitCard = async(req,res,next) => {
    let {admitCardNo,rollNumber} = req.body;
    let className = req.body.class;

    try {
        let admitCard = await AdmitCardModel.findOne({admitCardNo:admitCardNo,class:className,rollNumber:rollNumber})
        if (!admitCard) {
            return res.status(404).json({ errorMsg: 'Admit card not exist' });
        }
        let stream = admitCard.stream;
        let admitCardStructure = await AdmitCardStructureModel.findOne({class:className,stream:stream});
        if(!admitCardStructure){
            return res.status(404).json({ errorMsg: 'This class any exam not exist' });
        }
        return res.status(200).json({admitCardStructure:admitCardStructure,admitCard:admitCard});
    } catch (error) {
        console.log(error)
    }
}
let GetSingleStudentAdmitCardById = async(req,res,next) => {
    let studentId = req.params.id;
    try{
        let admitCard = await AdmitCardModel.findOne({studentId:studentId})
        if (!admitCard) {
            return res.status(404).json({ errorMsg: 'Admit card not exist' });
        }
        let stream = admitCard.stream;
        let className = admitCard.class;
        let admitCardStructure = await AdmitCardStructureModel.findOne({class:className,stream:stream});
        if(!admitCardStructure){
            return res.status(404).json({ errorMsg: 'This class any exam not exist' });
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