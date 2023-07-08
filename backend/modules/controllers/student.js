const StudentModel = require('../models/student');
const FeesStructureModel = require('../models/fees-structure');
const FeesCollectionModel = require('../models/fees-collection');

let countStudent = async (req, res, next) => {
    let countStudent = await StudentModel.count();
    return res.status(200).json({ countStudent });
}
let GetStudentPagination = async (req, res, next) => {
    let searchText = req.body.filters.searchText;
    let searchObj = {};
    if (searchText) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText) ? { $or: [{ class: searchText }, { rollNumber: searchText }] } : { name: new RegExp(`${searchText.toString().trim()}`, 'i') }

    }

    try {
        let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
        let page = req.body.page || 1;
        const studentList = await StudentModel.find(searchObj)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const countStudent = await StudentModel.count();

        let studentData = { countStudent: 0 };
        studentData.studentList = studentList;
        studentData.countStudent = countStudent;
        return res.json(studentData);
    } catch (error) {
        console.log(error);
    }
}

let GetAllStudent = async (req, res, next) => {

}
let GetAllStudentByClass = async (req, res, next) => {
    try {
        const singleStudent = await StudentModel.find({ class: req.params.class });
        return res.status(200).json(singleStudent);
    } catch (error) {
        console.log(error);
    }
}
let GetSingleStudent = async (req, res, next) => {
    try {
        const singleStudent = await StudentModel.findOne({ _id: req.params.id });
        return res.status(200).json(singleStudent);
    } catch (error) {
        console.log(error);
    }
}
let CreateStudent = async (req, res, next) => {

    let otp = Math.floor(Math.random() * 899999 + 100000);
    const { name, rollNumber } = req.body;
    const className = req.body.class;
    try {
        const checkFeesStr = await FeesStructureModel.findOne({ class: className });
        if (!checkFeesStr) {
            return res.status(404).json(`Please create fees structure for class ${className}`);
        }
        const checkRollNumber = await StudentModel.findOne({ rollNumber: rollNumber, class: className });
        if (checkRollNumber) {
            return res.status(400).json(`Roll number already exist for class ${className}`);
        }
        const totalFees = checkFeesStr.totalFees;
        const stallment = checkFeesStr.stallment;
        stallment.forEach((item) => {
            Object.keys(item).forEach((key) => {
                item[key] = 0;
            });
        });

        const studentData = {
            name: name,
            class: className,
            rollNumber: rollNumber,
            otp: otp,
        }
        const studentFeesData = {
            name: name,
            class: className,
            rollNumber: rollNumber,
            totalFees: totalFees,
            paidFees:0,
            dueFees:totalFees,
            stallment:stallment
        }
        const createStudent = await StudentModel.create(studentData);
        const createStudentFeesData = await FeesCollectionModel.create(studentFeesData);
        return res.status(200).json('Student Created succesfuly');
    } catch (error) {
        console.log(error);
    }
}
let UpdateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, rollNumber } = req.body;
        const studentData = {
            name: name,
            class: req.body.class,
            rollNumber: rollNumber
        }
        const updateStudent = await StudentModel.findByIdAndUpdate(id, { $set: studentData }, { new: true });
        return res.status(200).json('Student update succesfully');
    } catch (error) {
        console.log(error);
    }
}
let ChangeStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { statusValue } = req.body;
        let status = statusValue == 1 ? 'Active' : 'Inactive'
        const studentData = {
            status: status
        }
        const updateStatus = await StudentModel.findByIdAndUpdate(id, { $set: studentData }, { new: true });
        return res.status(200).json('Student update succesfully');
    } catch (error) {
        console.log(error);
    }
}
let DeleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteStudent = await StudentModel.findByIdAndRemove(id);
        return res.status(200).json('Student delete succesfully');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    countStudent,
    GetStudentPagination,
    GetAllStudent,
    GetAllStudentByClass,
    GetSingleStudent,
    CreateStudent,
    UpdateStudent,
    ChangeStatus,
    DeleteStudent,
}