const SchoolModel = require('../models/school');

let GetSingleSchoolNameLogo = async (req, res, next) => {
    try {
        const singleSchool = await SchoolModel.findOne({},'schoolName foundedYear');
        if (singleSchool) {
            return res.status(200).json(singleSchool);
        }
    } catch (error) {
        console.log(error);
    }
}
let GetSingleSchool = async (req, res, next) => {
    try {
        const singleSchool = await SchoolModel.findOne({});
        if (singleSchool) {
            return res.status(200).json(singleSchool);
        }
    } catch (error) {
        console.log(error);
    }
}
let CreateSchool = async (req, res, next) => {
    let { schoolName, affiliationNumber, schoolCode, foundedYear, board, medium, street, city, state, country, pinCode, phone, email } = req.body;
    const schoolData = { schoolName, affiliationNumber, schoolCode, foundedYear, board, medium, street, city, state, country, pinCode, phone, email };
    try {
        let countSchool = await SchoolModel.count();
        if(countSchool > 0){
            return res.status(400).json('School detail already exist !');
        }
        let school = await SchoolModel.findOne({affiliationNumber:affiliationNumber,schoolCode:schoolCode});
        if (school) {
            return res.status(400).json('School detail already exist !');
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
    GetSingleSchoolNameLogo,
    GetSingleSchool,
    CreateSchool,
    UpdateSchool,
    DeleteSchool,
}