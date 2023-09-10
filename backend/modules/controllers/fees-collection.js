const FeesCollectionModel = require('../models/fees-collection');
const FeesStructureModel = require('../models/fees-structure');
const { DateTime } = require('luxon');

let GetSingleStudentFeesCollection = async (req, res, next) => {
    let className = req.params.id;
    let rollNumber = req.params.rollNumber;
    try {
        const studentFeesCollection = await FeesCollectionModel.findOne({ class: className, rollNumber: rollNumber });
        return res.status(200).json(studentFeesCollection);
    } catch (error) {
        console.log(error);
    }
}

let GetAllStudentFeesCollectionByClass = async (req, res, next) => {
    let className = req.params.class;
    try {
        const studentFeesCollection = await FeesCollectionModel.find({ class: className });
        return res.status(200).json(studentFeesCollection);
    } catch (error) {
        console.log(error);
    }
}

let CreateFeesCollection = async (req, res, next) => {
    let className = req.body.class;
    let { rollNumber, feesInstallment, feesAmount } = req.body;
    let receiptNo = Math.floor(Math.random() * 899999 + 100000);
    const currentDateIst = DateTime.now().setZone('Asia/Kolkata');
    const istDateTimeString = currentDateIst.toFormat('dd-MM-yyyy hh:mm:ss a');
    try {

        const checkFeesStructure = await FeesStructureModel.findOne({ class: className });
        if (!checkFeesStructure) {
            return res.status(404).json(`Class ${className} fees structure not found`);
        }
        const checkFeesCollection = await FeesCollectionModel.findOne({ rollNumber: rollNumber, class: className });
        if (!checkFeesCollection) {
            return res.status(404).json(`${rollNumber} fees record not found`);
        }

        const feesStructureInstallment = checkFeesStructure.installment.find(item => Object.keys(item)[0] === feesInstallment);
        const paidFeesInstallment = checkFeesCollection.installment.find(item => Object.keys(item)[0] === feesInstallment);
        if (feesStructureInstallment[feesInstallment] === paidFeesInstallment[feesInstallment]) {
            return res.status(400).json(`${feesInstallment} fees installment already paid`);
        }
        const id = checkFeesCollection._id;
        const totalFees = checkFeesCollection.totalFees;
        const installments = checkFeesCollection.installment;
        const totalInstallment = installments.reduce((acc, installment) => {
            const value = Object.values(installment)[0];
            return acc + value;
        }, 0);
        const paidFees = totalInstallment + feesAmount;
        const dueFees = totalFees - paidFees;
        if (totalFees < paidFees) {
            return res.status(400).json(`All fees installment already paid`);
        }
        const installment = {
            class: className,
            receiptNo: receiptNo,
            rollNumber: rollNumber,
            totalFees: totalFees,
            paidFees: paidFees,
            dueFees: dueFees,
            feesInstallment: feesInstallment,
            feesAmount: feesAmount,
            paymentDate: istDateTimeString
        }
        const updatedDocument = await FeesCollectionModel.findOneAndUpdate(
            { _id: id,'installment': { $elemMatch: { [feesInstallment]: { $exists: true } } }, 'receipt': { $elemMatch: { [feesInstallment]: { $exists: true } } }, 'paymentDate': { $elemMatch: { [feesInstallment]: { $exists: true } } } },
            { $set: { [`installment.$.${feesInstallment}`]: feesAmount, [`receipt.$.${feesInstallment}`]: receiptNo, [`paymentDate.$.${feesInstallment}`]: istDateTimeString, paidFees: paidFees, dueFees: dueFees } },
            { new: true }
        );
        if (updatedDocument) {
            return res.status(200).json(installment);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    GetAllStudentFeesCollectionByClass,
    GetSingleStudentFeesCollection,
    CreateFeesCollection

}