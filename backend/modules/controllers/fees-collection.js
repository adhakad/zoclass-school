const FeesCollectionModel = require('../models/fees-collection');

let CreateFeesCollection = async (req, res, next) => {
    let className = req.body.class;
    let { rollNumber, feesAmount } = req.body;

    try {
        const checkPaidStallment = await FeesCollectionModel.findOne({ rollNumber: rollNumber, class: className });
        if (checkPaidStallment) {
            let id = await checkPaidStallment._id;
            let totalFees = checkPaidStallment.totalFees;
            let stallmentOne = await checkPaidStallment.stallmentOne;
            let stallmentTwo = await checkPaidStallment.stallmentTwo;
            let stallmentThree = await checkPaidStallment.stallmentThree;
            

            if (stallmentTwo === 0) {
                let paidFees = stallmentOne + feesAmount;
                let dueFees = totalFees - paidFees;
                let feesData = {paidFees:paidFees,dueFees:dueFees, stallmentTwo: feesAmount }
                const update = await FeesCollectionModel.findByIdAndUpdate(id, { $set: feesData }, { new: true });
                return res.status(200).json("fees payment successfully");
            }
            if (stallmentThree === 0) {
                let paidFees = stallmentOne + stallmentTwo + feesAmount;
                let dueFees = totalFees - paidFees;
                let feesData = {paidFees:paidFees,dueFees:dueFees, stallmentThree: feesAmount }
                const update = await FeesCollectionModel.findByIdAndUpdate(id, { $set: feesData }, { new: true });
                return res.status(200).json("fees payment successfully");
            }
        }
        let dueFees = 10000 - feesAmount;
        let feesCollectionData = {
            class: className,
            rollNumber: rollNumber,
            paidFees:feesAmount,
            dueFees:dueFees,
            stallmentOne: feesAmount,
        }
        let feesCollection = await FeesCollectionModel.create(feesCollectionData);
        console.log(feesCollection)
        return res.status(200).json('Student exam result add successfully');

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    CreateFeesCollection

}