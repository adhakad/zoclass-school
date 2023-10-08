const SchoolModel = require('../models/school');

let GetSingleSchool = async (req, res, next) => {
    try {
        const singleSchool = await SchoolModel.findOne({ _id: req.params.id });
        if(singleSchool){
            return res.status(200).json(singleSchool);
        }
    } catch (error) {
        console.log(error);
    }
}
let CreateSchool = async (req, res, next) => {
    const schoolData = {
        title: req.body.title,
    }
    try {
        let countSchool = await SchoolModel.count();
        if (countSchool == 15) {
            return res.status(400).json('School limit is over to 15');
        }
        const createSchool = await SchoolModel.create(schoolData);
        if (createSchool) {
            return res.status(200).json('School created successfully');
        }
    } catch (error) {
        console.log(error);
    }
}
let UpdateSchool = async (req, res, next) => {
    try {
        const id = req.params.id;
        const schoolData = {
            title: req.body.title
        }
        const updateSchool = await SchoolModel.findByIdAndUpdate(id, { $set: schoolData }, { new: true });
        if (updateSchool) {
            return res.status(200).json('School update successfully');
        }
    } catch (error) {
        console.log(error);
    }
}
let DeleteSchool = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteSchool = await SchoolModel.findByIdAndRemove(id);
        if (deleteSchool) {
            return res.status(200).json('School delete successfully');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    GetSingleSchool,
    CreateSchool,
    UpdateSchool,
    DeleteSchool,
}