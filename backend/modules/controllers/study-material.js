const StudyMaterialModel = require('../models/study-material');
const ClassSubjectModel = require('../models/class-subject');

let countStudyMaterial = async(req,res,next) => {
    let countStudyMaterial = await StudyMaterialModel.count();
    return res.status(200).json({countStudyMaterial});
}
let GetStudyMaterialPagination = async(req,res,next) => {
    let searchText = req.body.filters.searchText;
    let searchObj = {};
    if (searchText) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText)? {$or: [{ class: searchText }]} : {title: new RegExp(`${searchText.toString().trim()}`, 'i')}
          
      }

    try {
      let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
      let page = req.body.page || 1;
        const studyMaterialList = await StudyMaterialModel.find(searchObj)
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .exec();
        const countStudyMaterial = await StudyMaterialModel.count();
        
        let studyMaterialData = { countStudyMaterial: 0 };
        studyMaterialData.studyMaterialList = studyMaterialList;
        studyMaterialData.countStudyMaterial = countStudyMaterial;
        return res.json(studyMaterialData);
    } catch (error) {
        console.log(error);
    }
}

let GetAllStudyMaterial = async (req, res, next) => {
    try {
        const getAllBlog = await StudyMaterialModel.find({});
        return res.status(200).json(getAllBlog);
    } catch (error) {
        console.log(error);
    }
}
let GetSingleBlog = async (req,res,next) => {
    try {
        const singleBlog = await StudyMaterialModel.findOne({_id:req.params.id});
        return res.status(200).json(singleBlog);
    } catch (error) {
        console.log(error);
    }
}

let GetStudyMaterialByClassSubject = async (req, res, next) => {
    let data = {
        subject:req.params.subject,
        class: req.params.class
    }
    try {
        const singleStudyMaterial = await StudyMaterialModel.find(data);
        return res.status(200).json(singleStudyMaterial);
    } catch (error) {
        console.log(error);
    }
}

let GetStudyMaterialBySubject = async (req, res, next) => { 
    try {
        const singleStudyMaterial = await StudyMaterialModel.find({subject:req.params.subject});
        return res.status(200).json(singleStudyMaterial);
    } catch (error) {
        console.log(error);
    }
}

let CreateStudyMaterial = async (req, res, next) => {
    const { subject,title,tags,content } = req.body;
    let cls = req.body.class;
    const studyMaterialData = {
        class: cls,
        subject: subject,
        date: Date.now(),
        creator: "Abhishek Dhakad",
        title: title,
        tags:tags,
        content:content
    }
    try {
        const checkClassSubject = await ClassSubjectModel.findOne({class:cls,subject:subject});
        if(!checkClassSubject){
            return res.status(404).json(`${subject} does not exist on class ${req.body.class}`);
        }
        const createStudyMaterial = await StudyMaterialModel.create(studyMaterialData);
        return res.status(200).json('StudyMaterial add succesfuly');
    } catch (error) {
        console.log(error);
    }
}
let UpdateStudyMaterial = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { subject,date,creator,title,tags,content } = req.body;
        const studyMaterialData = {
            class: req.body.class,
            subject: subject,
            date: date,
            creator: creator,
            title: title,
            tags:tags,
            content:content
        }
        const updateStudyMaterial = await StudyMaterialModel.findByIdAndUpdate(id, { $set: studyMaterialData }, { new: true });
        return res.status(200).json('StudyMaterial update succesfuly');
    } catch (error) {
        console.log(error);
    }
}
let DeleteStudyMaterial = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteStudyMaterial = await StudyMaterialModel.findByIdAndRemove(id);
        return res.status(200).json('StudyMaterial delete succesfuly');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    countStudyMaterial,
    GetStudyMaterialPagination,
    GetAllStudyMaterial,
    GetSingleBlog,
    GetStudyMaterialByClassSubject,
    GetStudyMaterialBySubject,
    CreateStudyMaterial,
    UpdateStudyMaterial,
    DeleteStudyMaterial,
}