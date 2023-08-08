const AdmitCardModel = require("../models/admit-card");
const StudentModel = require('../models/student');

let GetSingleStudentAdmitCard = async(req,res,next) => {
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
    console.log(className)
    try{
        const admitCards = await AdmitCardModel.find({class:className});
        return res.status(200).json(admitCards);
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    GetSingleStudentAdmitCard,
    GetAllStudentAdmitCardByClass,
}