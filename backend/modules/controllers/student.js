'use strict';
const StudentModel = require('../models/student');
const AdmissionEnquiryModel = require('../models/admission-enquiry');
const FeesStructureModel = require('../models/fees-structure');
const FeesCollectionModel = require('../models/fees-collection');
const { DateTime } = require('luxon');

let countStudent = async (req, res, next) => {
    let countStudent = await StudentModel.count();
    return res.status(200).json({ countStudent });
}


let GetStudentPaginationByAdmission = async (req, res, next) => {
    let searchText = req.body.filters.searchText;
    let className = req.body.class;
    let searchObj = {};
    if (searchText) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText) ? { $or: [{ class: searchText }, { rollNumber: searchText }, { admissionNo: searchText }] } : { name: new RegExp(`${searchText.toString().trim()}`, 'i') }

    }

    try {
        let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
        let page = req.body.page || 1;
        const studentList = await StudentModel.find({ admissionType: 'New' }).find(searchObj)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const countStudent = await StudentModel.count({ admissionType: 'New' });

        let studentData = { countStudent: 0 };
        studentData.studentList = studentList;
        studentData.countStudent = countStudent;
        return res.json(studentData);
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}

let GetStudentAdmissionEnquiryPagination = async (req, res, next) => {
    let searchText = req.body.filters.searchText;
    let searchObj = {};
    if (searchText) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText)
            ? {
                $or: [{ contact: searchText }],
            }
            : { name: new RegExp(`${searchText.toString().trim()}`, 'i') };
    }

    try {
        let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
        let page = req.body.page || 1;
        const admissionEnquiryList = await AdmissionEnquiryModel.find(searchObj)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const countAdmissionEnquiry = await AdmissionEnquiryModel.count();

        let admissionEnquiryData = { countAdmissionEnquiry: 0 };
        admissionEnquiryData.admissionEnquiryList = admissionEnquiryList;
        admissionEnquiryData.countAdmissionEnquiry = countAdmissionEnquiry;
        return res.json(admissionEnquiryData);
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}


let GetStudentPaginationByClass = async (req, res, next) => {
    let searchText = req.body.filters.searchText;
    let className = req.body.class;
    let searchObj = {};
    if (searchText) {
        searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText) ? { $or: [{ class: searchText }, { rollNumber: searchText }, { admissionNo: searchText }] } : { name: new RegExp(`${searchText.toString().trim()}`, 'i') }

    }

    try {
        let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
        let page = req.body.page || 1;
        const studentList = await StudentModel.find({ class: className }).find(searchObj)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const countStudent = await StudentModel.count({ class: className });

        let studentData = { countStudent: 0 };
        studentData.studentList = studentList;
        studentData.countStudent = countStudent;
        return res.json(studentData);
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}

let GetAllStudentByClass = async (req, res, next) => {
    try {
        const singleStudent = await StudentModel.find({ class: req.params.class }, '-_id -otp -status -__v');
        return res.status(200).json(singleStudent);
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}
let GetSingleStudent = async (req, res, next) => {
    try {
        const singleStudent = await StudentModel.findOne({ _id: req.params.id });
        return res.status(200).json(singleStudent);
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}
let CreateStudent = async (req, res, next) => {
    let otp = Math.floor(Math.random() * 899999 + 100000);
    let receiptNo = Math.floor(Math.random() * 899999 + 100000);
    const currentDateIst = DateTime.now().setZone('Asia/Kolkata');
    const istDateTimeString = currentDateIst.toFormat('dd-MM-yyyy hh:mm:ss a');
    const doa = currentDateIst.toFormat('dd-MM-yyyy');
    let { name, rollNumber, session, admissionFees, admissionFeesPaymentType, admissionType, stream, admissionNo, dob, gender, category, religion, nationality, contact, address, fatherName, fatherQualification, fatherOccupation, fatherContact, fatherAnnualIncome, motherName, motherQualification, motherOccupation, motherContact, motherAnnualIncome } = req.body;
    let className = req.body.class;
    let onlineAdmissionStatus = req.body.status;
    let onlineAdmObjId = req.body._id;
    let objectId;
    if (onlineAdmObjId) {
        objectId = onlineAdmObjId;
    }
    let status;
    if (onlineAdmissionStatus === 'Complete') {
        status = onlineAdmissionStatus;
    }
    if (stream === "stream") {
        stream = "N/A";
    }
    const parsedDate = DateTime.fromFormat(dob, 'dd-MM-yyyy');
    if (!parsedDate.isValid) {
        dob = DateTime.fromISO(dob).toFormat("dd-MM-yyyy");
    }
    const studentData = {
        name, rollNumber, otp, session, admissionType, stream, admissionNo, class: className, dob: dob, doa: doa, gender, category, religion, nationality, contact, address, fatherName, fatherQualification, fatherOccupation, fatherContact, fatherAnnualIncome, motherName, motherQualification, motherOccupation, motherContact, motherAnnualIncome
    }
    try {
        const checkFeesStr = await FeesStructureModel.findOne({ class: className });
        if (!checkFeesStr) {
            return res.status(404).json(`Please create fees structure for this class !`);
        }
        const checkRollNumber = await StudentModel.findOne({ rollNumber: rollNumber, class: className });
        if (checkRollNumber) {
            return res.status(400).json(`Roll number already exist for this class !`);
        }
        let totalFees = checkFeesStr.totalFees;
        let installment = checkFeesStr.installment;
        const admissionFee = checkFeesStr.admissionFees;
        installment.forEach((item) => {
            Object.keys(item).forEach((key) => {
                item[key] = 0;
            });
        });
        let admissionFeesPayable = false;
        let paidFees = 0;
        let dueFees = totalFees - paidFees;
        if (admissionType == 'New' && admissionFeesPaymentType == 'Immediate') {
            admissionFeesPayable = true;
            admissionFees = admissionFees;
            totalFees = totalFees + admissionFees;
            paidFees = admissionFees;
            dueFees = totalFees - admissionFees;
        }
        if (admissionType == 'New' && admissionFeesPaymentType == 'Later') {
            admissionFeesPayable = true;
            admissionFees = 0;
            totalFees = totalFees + admissionFee;
            paidFees = admissionFees;
            dueFees = totalFees - admissionFees;
        }
        const studentFeesData = {
            class: className,
            admissionFees: admissionFees,
            admissionFeesPayable: admissionFeesPayable,
            totalFees: totalFees,
            paidFees: paidFees,
            dueFees: dueFees,
            receipt: installment,
            installment: installment,
            paymentDate: installment,
        }
        if (admissionType == 'New' && admissionFeesPaymentType == 'Immediate') {
            studentFeesData.admissionFeesReceiptNo = receiptNo,
                studentFeesData.admissionFeesPaymentDate = istDateTimeString
        }
        let createStudent = await StudentModel.create(studentData);
        if (createStudent) {
            let studentId = createStudent._id;
            studentFeesData.studentId = studentId;
            let createStudentFeesData = await FeesCollectionModel.create(studentFeesData);
            if (status === 'Complete' && objectId !== null && objectId !== undefined) {
                const admissionData = {
                    status: status
                }
                const updateStatus = await AdmissionEnquiryModel.findByIdAndUpdate(objectId, { $set: admissionData }, { new: true });
            }
            if (createStudentFeesData) {
                let studentAdmissionData = {
                    session: createStudent.session,
                    name: createStudent.name,
                    class: createStudent.class,
                    admissionNo: createStudent.admissionNo,
                    rollNumber: createStudent.rollNumber,
                    dob: createStudent.dob,
                    fatherName: createStudent.fatherName,
                    motherName: createStudent.motherName,
                    admissionType: admissionType,
                    admissionFeesPaymentType: admissionFeesPaymentType,
                    admissionFees: createStudentFeesData.admissionFees,
                    admissionFeesReceiptNo: createStudentFeesData.admissionFeesReceiptNo,
                    admissionFeesPaymentDate: createStudentFeesData.admissionFeesPaymentDate,
                    totalFees: createStudentFeesData.totalFees,
                    paidFees: createStudentFeesData.paidFees,
                    dueFees: createStudentFeesData.dueFees
                }
                return res.status(200).json({ studentAdmissionData: studentAdmissionData, successMsg: 'Student created succesfully.' });
            }
        }
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}

let CreateStudentAdmissionEnquiry = async (req, res, next) => {
    const currentDateIst = DateTime.now().setZone('Asia/Kolkata');
    const doae = currentDateIst.toFormat('dd-MM-yyyy');
    let { name, session, stream, dob, gender, category, religion, nationality, contact, address, fatherName, fatherQualification, fatherOccupation, fatherContact, fatherAnnualIncome, motherName, motherQualification, motherOccupation, motherContact, motherAnnualIncome } = req.body;
    let className = req.body.class;
    if (stream === "stream") {
        stream = "N/A";
    }
    dob = DateTime.fromISO(dob).toFormat("dd-MM-yyyy");
    const studentData = {
        name, session, stream, class: className, dob: dob, doae: doae, gender, category, religion, nationality, contact, address, fatherName, fatherQualification, fatherOccupation, fatherContact, fatherAnnualIncome, motherName, motherQualification, motherOccupation, motherContact, motherAnnualIncome
    }
    try {
        const checkContact = await AdmissionEnquiryModel.findOne({ name: name, contact: contact });
        if (checkContact) {
            return res.status(400).json(`Name: ${name} phone ${contact} is already fill online admission form, please visit school and confirm your admission !`);
        }
        let createAdmissionEnquiryModel = await AdmissionEnquiryModel.create(studentData);
        if (createAdmissionEnquiryModel) {
            return res.status(200).json({ successMsg: 'Online admission form submited succesfully.' });
        }
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}

let CreateBulkStudentRecord = async (req, res, next) => {
    let bulkStudentRecord = req.body.bulkStudentRecord;
    let className = req.body.class;
    className = parseInt(className);
    const classMappings = {
        "KG-I": 21,
        "KG-II": 22,
        "1st": 1,
        "2nd": 2,
        "3rd": 3,
        "4th": 4,
        "5th": 5,
        "6th": 6,
        "7th": 7,
        "8th": 8,
        "9th": 9,
        "10th": 10,
        "11th": 11,
        "12th": 12,
    };
    bulkStudentRecord.forEach((student) => {
        student.class = classMappings[student.class] || "Unknown";
    });
    let studentData = [];
    for (const student of bulkStudentRecord) {
        let otp = Math.floor(Math.random() * 899999 + 100000);
        studentData.push({
            name: student.name,
            rollNumber: student.rollNumber,
            otp: otp,
            session: student.session,
            admissionType: student.admissionType,
            stream: student.stream,
            admissionNo: student.admissionNo,
            class: student.class,
            dob: student.dob,
            doa: student.doa,
            gender: student.gender,
            category: student.category,
            religion: student.religion,
            nationality: student.nationality,
            contact: student.contact,
            address: student.address,
            fatherName: student.fatherName,
            fatherQualification: student.fatherQualification,
            fatherOccupation: student.fatherOccupation,
            fatherContact: student.fatherContact,
            fatherAnnualIncome: student.fatherAnnualIncome,
            motherName: student.motherName,
            motherQualification: student.motherQualification,
            motherOccupation: student.motherOccupation,
            motherContact: student.motherContact,
            motherAnnualIncome: student.motherAnnualIncome,
        });
    }
    try {

        if (studentData.length > 100) {
            return res.status(400).json('File too large, Please make sure that file records to less then or equals to 100 !');
        }
        const otherClassAdmissionNo = [];
        for (const student of studentData) {
            if (student.class !== className) {
                const { admissionNo } = student;
                if (admissionNo) {
                    otherClassAdmissionNo.push(admissionNo);
                }
                continue;
            }
        }
        if (otherClassAdmissionNo.length > 0) {
            const spreadAdmissionNo = otherClassAdmissionNo.join(', ');
            return res.status(400).json(`Admission number(s) ${spreadAdmissionNo} student(s) class is invailid !`);
        }
        const existingRecords = await StudentModel.find({ class: className }).lean();
        const duplicateAdmissionNo = [];
        const duplicateRollNumber = [];
        for (const student of studentData) {
            // Check duplicate students exist from dadabase
            const { admissionNo, rollNumber } = student;
            const admissionNoExists = existingRecords.some(record => record.admissionNo == admissionNo);
            const rollNumberExists = existingRecords.some(record => record.rollNumber == rollNumber);
            if (admissionNoExists) {
                duplicateAdmissionNo.push(admissionNo);
            }
            if (rollNumberExists) {
                duplicateRollNumber.push(rollNumber);
            }
        }
        if (duplicateAdmissionNo.length > 0) {
            const spreadAdmissionNo = duplicateAdmissionNo.join(', ');
            return res.status(400).json(`Admission number(s) ${spreadAdmissionNo} already exist !`);
        }
        if (duplicateRollNumber.length > 0) {
            const spreadRollNumber = duplicateRollNumber.join(', ');
            return res.status(400).json(`Roll number(s) ${spreadRollNumber} already exist !`);
        }


        const checkFeesStr = await FeesStructureModel.findOne({ class: className });
        if (!checkFeesStr) {
            return res.status(404).json(`Please create fees structure for class ${className} !`);
        }

        let installment = checkFeesStr.installment;
        installment.forEach((item) => {
            Object.keys(item).forEach((key) => {
                item[key] = 0;
            });
        });
        const createStudent = await StudentModel.create(studentData);
        let admissionFees = checkFeesStr.admissionFees;
        let totalFees = checkFeesStr.totalFees;

        let studentFeesData = [];
        for (let i = 0; i < createStudent.length; i++) {
            let student = createStudent[i];

            let feesObject = {
                studentId: student._id,
                class: student.class,
                admissionFeesPayable: false,
                admissionFees: 0,
                totalFees: totalFees,
                paidFees: 0,
                dueFees: totalFees,
                receipt: installment,
                installment: installment,
                paymentDate: installment,
            };

            if (student.admissionType === 'New') {
                feesObject.admissionFeesPayable = true;
                feesObject.totalFees += admissionFees;
                feesObject.dueFees += admissionFees;
            }

            studentFeesData.push(feesObject);
        }
        if (createStudent && studentFeesData.length > 0) {
            const createStudentFeesData = await FeesCollectionModel.create(studentFeesData);
            if (createStudentFeesData) {
                return res.status(200).json('Student created succesfully.');
            }
        }
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
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
        return res.status(200).json('Student update succesfully.');
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
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
        return res.status(200).json('Student update succesfully.');
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}
let DeleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deleteStudent = await StudentModel.findByIdAndRemove(id);
        return res.status(200).json('Student delete succesfully.');
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}

module.exports = {
    countStudent,
    GetStudentPaginationByAdmission,
    GetStudentAdmissionEnquiryPagination,
    GetStudentPaginationByClass,
    GetAllStudentByClass,
    GetSingleStudent,
    CreateStudent,
    CreateStudentAdmissionEnquiry,
    CreateBulkStudentRecord,
    UpdateStudent,
    ChangeStatus,
    DeleteStudent,
}