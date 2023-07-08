const FeesCollectionModel = require('../models/fees-collection');

let GetSingleStudentFeesCollection = async(req,res,next) => {
    let className = req.params.id;
    let rollNumber = req.params.rollNumber;
    try{
        const studentFeesCollection = await FeesCollectionModel.findOne({class:className,rollNumber:rollNumber});
        return res.status(200).json(studentFeesCollection);
    }catch(error){
        console.log(error);
    }
}

let GetAllStudentFeesCollectionByClass = async(req,res,next) => {
    let className = req.params.class;
    try{
        const studentFeesCollection = await FeesCollectionModel.find({class:className});
        return res.status(200).json(studentFeesCollection);
    }catch(error){
    console.log(error);
    }
}

let CreateFeesCollection = async (req, res, next) => {
    let className = req.body.class;
    let { rollNumber, feesAmount } = req.body;
    const fieldToUpdate = req.body.feesStallment; // Dynamic field name to update
    const newValue = req.body.feesAmount;
    // console.log(req.body)

    try {
        const checkPaidStallment = await FeesCollectionModel.findOne({ rollNumber: rollNumber, class: className });
        const id = checkPaidStallment._id;
        const totalFees = checkPaidStallment.totalFees;
        const stallments = checkPaidStallment.stallment;

        const totalStallment = stallments.reduce((acc, installment) => {
            const value = Object.values(installment)[0];
            return acc + value;
          }, 0);
          
          console.log("Total Stallment:", totalStallment);

          const paidFees = totalStallment + newValue;

          const dueFees = totalFees - paidFees;

          console.log(dueFees)




        const updatedDocument = await FeesCollectionModel.findOneAndUpdate(
            { _id: id, 'stallment': { $elemMatch: { [fieldToUpdate]: { $exists: true } } } },
            { $set: { [`stallment.$.${fieldToUpdate}`]: newValue ,paidFees:paidFees,dueFees:dueFees} },
            { new: true }
          );
          console.log(updatedDocument)
          console.log("updatedDocument")
        
        // if (checkPaidStallment) {
        //     let id = await checkPaidStallment._id;
        //     let totalFees = checkPaidStallment.totalFees;
        //     let stallmentOne = await checkPaidStallment.stallmentOne;
        //     let stallmentTwo = await checkPaidStallment.stallmentTwo;
        //     let stallmentThree = await checkPaidStallment.stallmentThree;
            

        //     if (stallmentTwo === 0) {
        //         let paidFees = stallmentOne + feesAmount;
        //         let dueFees = totalFees - paidFees;
        //         let feesData = {paidFees:paidFees,dueFees:dueFees, stallmentTwo: feesAmount }
        //         const update = await FeesCollectionModel.findByIdAndUpdate(id, { $set: feesData }, { new: true });
        //         return res.status(200).json("fees payment successfully");
        //     }
        //     if (stallmentThree === 0) {
        //         let paidFees = stallmentOne + stallmentTwo + feesAmount;
        //         let dueFees = totalFees - paidFees;
        //         let feesData = {paidFees:paidFees,dueFees:dueFees, stallmentThree: feesAmount }
        //         const update = await FeesCollectionModel.findByIdAndUpdate(id, { $set: feesData }, { new: true });
        //         return res.status(200).json("fees payment successfully");
        //     }
        // }
        // let dueFees = 10000 - feesAmount;
        // let feesCollectionData = {
        //     class: className,
        //     rollNumber: rollNumber,
        //     paidFees:feesAmount,
        //     dueFees:dueFees,
        //     stallmentOne: feesAmount,
        // }
        // let feesCollection = await FeesCollectionModel.create(feesCollectionData);
        // console.log(feesCollection)
        // return res.status(200).json('Student exam result add successfully');

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    GetAllStudentFeesCollectionByClass,
    GetSingleStudentFeesCollection,
    CreateFeesCollection

}