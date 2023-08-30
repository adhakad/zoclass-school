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
    let { rollNumber, feesStallment, feesAmount } = req.body;
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

        const feesStructureStallment = checkFeesStructure.stallment.find(item => Object.keys(item)[0] === feesStallment);
        const paidFeesStallment = checkFeesCollection.stallment.find(item => Object.keys(item)[0] === feesStallment);
        if (feesStructureStallment[feesStallment] === paidFeesStallment[feesStallment]) {
            return res.status(400).json(`${feesStallment} fees stallment already paid`);
        }
        const id = checkFeesCollection._id;
        const totalFees = checkFeesCollection.totalFees;
        const stallments = checkFeesCollection.stallment;
        const totalStallment = stallments.reduce((acc, installment) => {
            const value = Object.values(installment)[0];
            return acc + value;
        }, 0);
        const paidFees = totalStallment + feesAmount;
        const dueFees = totalFees - paidFees;
        if (totalFees < paidFees) {
            return res.status(400).json(`All fees stallment already paid`);
        }
        const updatedDocument = await FeesCollectionModel.findOneAndUpdate(
            { _id: id, 'stallment': { $elemMatch: { [feesStallment]: { $exists: true } } }, 'receipt': { $elemMatch: { [feesStallment]: { $exists: true } } },'paymentDate': { $elemMatch: { [feesStallment]: { $exists: true } } } },
            { $set: { [`stallment.$.${feesStallment}`]: feesAmount, [`receipt.$.${feesStallment}`]: receiptNo,[`paymentDate.$.${feesStallment}`]: istDateTimeString, paidFees: paidFees, dueFees: dueFees } },
            { new: true }
        );
        return res.status(200).json(`Fees payment successfuly`);
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    GetAllStudentFeesCollectionByClass,
    GetSingleStudentFeesCollection,
    CreateFeesCollection

}