const FeesStructureModel = require('../models/fees-structure');
const classModel = require('../models/class');


let GetSingleClassFeesStructure = async(req,res,next) => {
    let className = req.params.id;
    try{
        const singleFeesStr = await FeesStructureModel.findOne({class:className});
        return res.status(200).json(singleFeesStr);
    }catch(error){
        console.log(error);
    }
}

let CreateFeesStructure = async (req, res, next) => {
    let className = req.body.class;
    let { totalFees } = req.body;
    let feesType = req.body.type.feesType;
    let feesPayType = req.body.type.feesPayType;
    let feesTypeTotal = feesType.reduce((total, obj) => {
        let value = Object.values(obj)[0];
        return total + value;
      }, 0);
      let feesPayTypeTotal = feesPayType.reduce((total, obj) => {
        let value = Object.values(obj)[0];
        return total + value;
      }, 0);

    try {
        const checkClassExist = await classModel.findOne({ class: className });
        if(!checkClassExist){
            return res.status(404).json('Invalid Class');
        }
        const checkFeesStructure = await FeesStructureModel.findOne({ class: className });
        if (checkFeesStructure) {
            return res.status(400).json(`Class ${className} fees structure already exist`);
        }
        if (totalFees!==feesTypeTotal) {
            return res.status(400).json(`Class ${className} total fees is not equal to all fees particulars total`);
        }
        if (totalFees!==feesPayTypeTotal) {
            return res.status(400).json(`Class ${className} total fees is not equal to all fees stallment total`);
        }
        
        
        let feesStructureData = {
            class: className,
            totalFees: totalFees,
            feesType:feesType,
            stallment:feesPayType,
        }
        let feesStructure = await FeesStructureModel.create(feesStructureData);
        // console.log(feesStructure)
        return res.status(200).json('Fees structure add successfuly');

    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    GetSingleClassFeesStructure,
    CreateFeesStructure

}