const ClassSubjectModel = require('../models/class-subject');

let countClassSubject = async(req,res,next) => {
    let countClassSubject = await ClassSubjectModel.count();
    return res.status(200).json({countClassSubject});
}
let GetClassSubjectPagination = async(req,res,next) => {
    let searchText = req.body.filters.searchText;
    let searchObj = {};
    if (searchText) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText)
          ? {
              $or: [{ class: searchText }],
            }
          : { subject: new RegExp(`${searchText.toString().trim()}`, 'i') };
      }

    try {
      let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
      let page = req.body.page || 1;
        const classSubjectList = await ClassSubjectModel.find(searchObj)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
        const countClassSubject = await ClassSubjectModel.count();
        
        let classSubjectData = { countClassSubject: 0 };
        classSubjectData.classSubjectList = classSubjectList;
        classSubjectData.countClassSubject = countClassSubject;
        return res.json(classSubjectData);
    } catch (error) {
        console.log(error);
    }
}
let GetAllClassSubject = async(req,res,next) => {
    try{
        const classSubjectList = await ClassSubjectModel.find({});
        return res.status(200).json(classSubjectList);
    }catch(error){
        console.log(error)
    }  
}
let GetSubjectByClass = async(req,res,next) => {
    try{
        const subjectList = await ClassSubjectModel.find({class:req.params.class});
        return res.status(200).json(subjectList);
    }catch(error){
        console.log(error);
    }  
}
let GetSingleClassSubject = async(req,res,next) => {
    try{
        const singleClassSubject = await ClassSubjectModel.findOne({_id:req.params.id});
        return res.status(200).json(singleClassSubject);
    }catch(error){
        console.log(error);
    }  
}
let CreateClassSubject = async(req,res,next) => {
    let cls = req.body.class;
    let subject = req.body.subject;
    try{
        const classSubjectData = {
            class:cls,
            subject:subject,
        }
        let checkClassSubject = await ClassSubjectModel.findOne({class:cls,subject:subject});
        if(checkClassSubject){
            return res.status(400).json("Class and subject combination already exist")
        }
        const createClassSubject = await ClassSubjectModel.create(classSubjectData);
        return res.status(200).json("Class and subject combination created succesfully");
    }catch(error){
        console.log(error);
    }
}
let UpdateClassSubject = async(req,res,next) => {
    try{
        const id = req.params.id;
        const classSubjectData = {
            class:req.body.class,
            subject:req.body.subject,
        }
        const updateClassSubject = await ClassSubjectModel.findByIdAndUpdate(id,{$set:classSubjectData},{new:true});
        return res.status(200).json('Class and subject combination update succesfully');
    }catch(error){
        console.log(error);
    }
}
let DeleteClassSubject = async(req,res,next) => {
    try{
        const id = req.params.id;
        const deleteClassSubject = await ClassSubjectModel.findByIdAndRemove(id);
        return res.status(200).json('Class and subject combination delete succesfuly');
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    countClassSubject,
    GetClassSubjectPagination,
    GetAllClassSubject,
    GetSubjectByClass,
    GetSingleClassSubject,
    CreateClassSubject,
    UpdateClassSubject,
    DeleteClassSubject,
}