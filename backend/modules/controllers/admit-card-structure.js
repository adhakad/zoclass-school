'use strict';
const AdmitCardStructureModel = require('../models/admit-card-structure');
const AdmitCardModel = require("../models/admit-card");
const StudentModel = require('../models/student');
const NotificationModel = require('../models/notification');

let GetSingleClassAdmitCardStructure = async (req, res, next) => {
    let className = req.params.id;
    try {
        const singleAdmitCardStr = await AdmitCardStructureModel.find({ class: className });
        return res.status(200).json(singleAdmitCardStr);
    } catch (error) {
        return res.status(500).json('Internal Server Error');;
    }
}
let CreateAdmitCardStructure = async (req, res, next) => {
    let className = req.body.class;
    let { examType, stream } = req.body;
    let { examDate, startTime, endTime } = req.body.type;
    if (stream === "stream") {
        stream = "N/A";
    }
    let streamMsg = `${stream} stream`;

    try {
        const checkExamExist = await AdmitCardStructureModel.findOne({ class: className, stream: stream });
        if (checkExamExist) {
            if (stream === "N/A") {
                streamMsg = ``;
            }
            return res.status(400).json(`Class ${className} ${streamMsg} exam admit card structure already exist !`);
        }
        let admitCardStructureData = {
            class: className,
            examType: examType,
            stream: stream,
            examDate: examDate,
            examStartTime: startTime,
            examEndTime: endTime,
        }
        const studentData = await StudentModel.find({ class: className, stream: stream });

        let studentAdmitCardData = [];
        for (const student of studentData) {
            studentAdmitCardData.push({
                studentId: student._id,
                class: className,
                stream: stream,
                examType: examType,
            });
        }
        let admitCardStructure = await AdmitCardStructureModel.create(admitCardStructureData);
        let studentAdmitCard = await AdmitCardModel.create(studentAdmitCardData);
        if (admitCardStructure && studentAdmitCard) {
            return res.status(200).json('Admit card structure add successfuly');
        }

    } catch (error) {
        return res.status(500).json('Internal Server Error');;
    }
}
let DeleteAdmitCardStructure = async (req, res, next) => {
    try {
        const id = req.params.id;
        const admitCard = await AdmitCardStructureModel.findOne({ _id: id });
        const className = admitCard.class;
        const stream = admitCard.stream;
        const examType = admitCard.examType;
        const deleteAdmitCard = await AdmitCardModel.deleteMany({ class: className, stream: stream, examType: examType });
        const deleteAdmitCardStructure = await AdmitCardStructureModel.findByIdAndRemove(id);
        if (deleteAdmitCard && deleteAdmitCardStructure) {
            return res.status(200).json('Admit card structure delete succesfully');
        }
    } catch (error) {
        return res.status(500).json('Internal Server Error');;
    }
}

let ChangeAdmitCardPublishStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const admitCardStr = await AdmitCardStructureModel.findOne({ _id: id });
        if (!admitCardStr) {
            return res.status(200).json('Admit card structure not found');
        }
        const findAdmitCardPublishStatus = await admitCardStr.admitCardPublishStatus;
        const cls = await admitCardStr.class;
        const stream = await admitCardStr.stream;
        const examType = await admitCardStr.examType;
        let title = '';
        let message = '';
        if (findAdmitCardPublishStatus == false) {
            let className;
            if (cls == 1) {
                className = `${cls}st`
            }
            if (cls == 2) {
                className = `${cls}nd`
            }
            if (cls == 3) {
                className = `${cls}rd`
            }
            if (cls >= 4 && cls <= 12) {
                className = `${cls}th`
            }
            if (cls == 21) {
                className = `KG-I`
            }
            if (cls == 22) {
                className = `KG-II`
            }
            title = `Class ${className} ${examType} exam online admit cards released - Download Now!`;
            message = `All class ${className} students are informed that the online admit cards for your ${examType} exams have been issued on the school's website. You can download them online using the credentials provided by your school. Best of luck for your upcoming exams!`
        }
        const { admitCardPublishStatus } = req.body;
        const admitCardPublishData = {
            admitCardPublishStatus: admitCardPublishStatus
        }
        const updateStatus = await AdmitCardStructureModel.findByIdAndUpdate(id, { $set: admitCardPublishData }, { new: true });
        if (updateStatus) {
            const notification = await NotificationModel.findOne({ class: cls, title: title });
            if (!notification && title !== '') {
                const notificationData = {
                    title: title,
                    message: message,
                    role: 'Student',
                    class: cls,
                    date: Date.now(),
                }
                let createNotification = await NotificationModel.create(notificationData);
                if (createNotification) {
                    return res.status(200).json('Admit card publish status update succesfully');
                }
            }
            return res.status(200).json('Admit card publish status update succesfully');
        }

    } catch (error) {
        return res.status(500).json('Internal Server Error');
    }
}



module.exports = {
    GetSingleClassAdmitCardStructure,
    CreateAdmitCardStructure,
    DeleteAdmitCardStructure,
    ChangeAdmitCardPublishStatus
}