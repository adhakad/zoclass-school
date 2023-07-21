const AdmissionModel = require('../models/admission');

// let countAdmission = async(req,res,next) => {
//     let countAdmission = await AdmissionModel.count();
//     return res.status(200).json({countAdmission});
// }

// let GetAdmissionPagination = async(req,res,next) => {
//     let searchText = req.body.filters.searchText;
//     let searchObj = {};
//     if (searchText) {
//         searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText)
//           ? {
//               $or: [{ discount: searchText }, { price: searchText }],
//             }
//           : { title: new RegExp(`${searchText.toString().trim()}`, 'i') };
//       }

//     try {
//       let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
//       let page = req.body.page || 1;
//         const admissionList = await AdmissionModel.find(searchObj)
//           .limit(limit * 1)
//           .skip((page - 1) * limit)
//           .exec();
//         const countAdmission = await AdmissionModel.count();

//         let admissionData = { countAdmission: 0 };
//         admissionData.admissionList = admissionList;
//         admissionData.countAdmission = countAdmission;
//         return res.json(admissionData);
//     } catch (error) {
//         console.log(error);
//     }
// }
// let GetAllAdmission = async(req,res,next) => {
//     try{
//         const admissionList = await AdmissionModel.find({});
//         return res.status(200).json(admissionList);
//     }catch(error){
//         console.log(error)
//     }  
// }
// let GetSingleAdmission = async(req,res,next) => {
//     try{
//         const singleAdmission = await AdmissionModel.findOne({_id:req.params.id});
//         return res.status(200).json(singleAdmission);
//     }catch(error){
//         console.log(error);
//     }
// }
let CreateAdmission = async (req, res, next) => {
    const todayDate = new Date();
    const admissionNo = Math.floor(Math.random() * 89999999 + 10000000);
    let { name, session, dob, gender, category, religion, nationality, contact, address, fatherName, fatherQualification, fatherOccupation, fatherContact, fatherAnnualIncome, motherName, motherQualification, motherOccupation, motherContact, motherAnnualIncome } = req.body;
    let className = req.body.class;
    const date = new Date(dob);
    const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
    };
    dob = date.toLocaleDateString(undefined, options);
    const doa = todayDate.toLocaleDateString(undefined, options);
    const admissionData = {
        name, session, admissionNo:admissionNo, class: className, dob: dob, doa: doa, gender, category, religion, nationality, contact, address, fatherName, fatherQualification, fatherOccupation, fatherContact, fatherAnnualIncome, motherName, motherQualification, motherOccupation, motherContact, motherAnnualIncome
    }
    try {
        const createAdmission = await AdmissionModel.create(admissionData);
        return res.status(200).json('Admission created successfully');
    } catch (error) {
        console.log(error);
    }
}
// let UpdateAdmission = async(req,res,next) => {
//     try{
//         const id = req.params.id;
//         const admissionData = {
//             title:req.body.title
//         }
//         const updateAdmission = await AdmissionModel.findByIdAndUpdate(id,{$set:admissionData},{new:true});
//         return res.status(200).json('Admission update successfully');
//     }catch(error){
//         console.log(error);
//     }
// }
// let DeleteAdmission = async(req,res,next) => {
//     try{
//         const id = req.params.id;
//         const singleAdmission = await AdmissionModel.findOne({_id:id});
//         const singleImage = await singleAdmission.image;
//         await fs.unlinkSync('./public/admission-image/'+singleImage);
//         const deleteAdmission = await AdmissionModel.findByIdAndRemove(id);
//         return res.status(200).json('Admission delete successfully');
//     }catch(error){
//         console.log(error);
//     }
// }

module.exports = {
    // countAdmission,
    // GetAdmissionPagination,
    // GetAllAdmission,
    // GetSingleAdmission,
    CreateAdmission,
    // UpdateAdmission,
    // DeleteAdmission,
}