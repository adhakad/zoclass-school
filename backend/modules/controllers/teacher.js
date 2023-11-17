'use strict';
const fs = require('fs');
const TeacherModel = require('../models/teacher');

let countTeacher = async(req,res,next) => {
    let countTeacher = await TeacherModel.count();
    return res.status(200).json({countTeacher});
}
let GetTeacherPagination = async (req, res, next) => {
    let searchText = req.body.filters.searchText;
    let searchObj = {};
    if (searchText) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText)
            ? {
                $or: [{ discount: searchText }, { price: searchText }],
            }
            : { name: new RegExp(`${searchText.toString().trim()}`, 'i') };
    }

    try {
        let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
        let page = req.body.page || 1;
        const teacherList = await TeacherModel.find(searchObj)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const countTeacher = await TeacherModel.count();

        let teacherData = { countTeacher: 0 };
        teacherData.teacherList = teacherList;
        teacherData.countTeacher = countTeacher;
        return res.json(teacherData);
    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}
let GetAllTeacher = async (req, res, next) => {
    try {
        const teacherList = await TeacherModel.find({});
        return res.status(200).json(teacherList);
    } catch (error) {
        console.log(error)
    }
}
let GetSingleTeacher = async (req, res, next) => {
    try {
        const singleTeacher = await TeacherModel.findOne({ _id: req.params.id });
        return res.status(200).json(singleTeacher);
    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}
let CreateTeacher = async (req, res, next) => {
    let otp = Math.floor(Math.random() * 899999 + 100000);
    const { name,teacherUserId, education} = req.body;
    try {
        const checkTeacher = await TeacherModel.findOne({teacherUserId:teacherUserId});
        if(checkTeacher){
            return res.status(400).json("Teacher user id already exist")
        }
        const teacherData = {
            name: name,
            teacherUserId:teacherUserId,
            education: education,
            otp:otp,
            image: req.file.filename,
        }
        const createTeacher = await TeacherModel.create(teacherData);
        return res.status(200).json('Teacher created succesfully');
    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}
let UpdateTeacher = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { name, education } = req.body;
        const teacherData = {
            name: name,
            education: education
        }
        const updateTeacher = await TeacherModel.findByIdAndUpdate(id, { $set: teacherData }, { new: true });
        return res.status(200).json('Teacher updated succesfully');
    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}
let ChangeStatus = async(req,res,next) => {
    try {
        const id = req.params.id;
        const { statusValue } = req.body;
        let status = statusValue == 1 ? 'Active' : 'Inactive'
        const teacherData = {
            status:status
        }
        const updateStatus = await TeacherModel.findByIdAndUpdate(id, { $set: teacherData }, { new: true });
        return res.status(200).json('Teacher update succesfully');
    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}
let DeleteTeacher = async (req, res, next) => {
    try {
        const id = req.params.id;
        const singleTeacher = await TeacherModel.findOne({ _id: id });
        const singleImage = await singleTeacher.image;
        await fs.unlinkSync('./public/teacher-image/' + singleImage);
        const deleteTeacher = await TeacherModel.findByIdAndRemove(id);
        return res.status(200).json('Teacher delete succesfully');
    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}

module.exports = {
    countTeacher,
    GetTeacherPagination,
    GetAllTeacher,
    GetSingleTeacher,
    CreateTeacher,
    UpdateTeacher,
    ChangeStatus,
    DeleteTeacher,
}