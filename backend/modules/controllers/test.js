const TestModel = require('../models/test');
const QuestionModel = require('../models/question');
const ClassSubjectModel = require('../models/class-subject');

let countTest = async(req,res,next) => {
  let countTest = await TestModel.count();
  return res.status(200).json({countTest});
}
let GetTestPagination = async (req, res, next) => {
  let searchText = req.body.filters.searchText;
  let searchObj = {};
  if (searchText) {
    searchObj = /^(?:\d*\.\d{1,2}|\d+)$/.test(searchText)
      ? {
        $or: [{ class: searchText }],
      }
      : { title: new RegExp(`${searchText.toString().trim()}`, 'i') };
  }

  try {
    
    let limit = (req.body.limit) ? parseInt(req.body.limit) : 10;
    let page = req.body.page || 1;
    let testList = await TestModel.find(searchObj)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const countTest = await TestModel.count();
    let testData = { countTest: 0 };
    testData.testList = testList;
    testData.countTest = countTest;
    let timeNow = new Date().getTime();
    return res.json({ testData, timeNow });
  } catch (error) {
    console.log(error);
  }
}
let GetAllTest = async (req, res, next) => {
  try {
    const testList = await TestModel.find({});
    return res.status(200).json(testList);
  } catch (error) {
    console.log(error)
  }
}
let GetSingleClassAllTest = async (req, res, next) => {
  let id = req.params.id;
  let testList = await TestModel.find({ class: id });
  if (!testList) {
    return res.status(404).json({errorMsg:`${id} test not exist`});
  }
  let timeNow = new Date().getTime();
  return res.json({ testList, timeNow });
}
let GetSingleTestById = async(req,res,next) =>{
  let testId = req.params.id;
  let test = await TestModel.findOne({_id:testId});
  if(!test){
    return res.status(404).json({errorMsg:"Test not found"});
  }
  return res.status(200).json(test);
}
let GetSingleTest = async (req, res, next) => {
  let cls = req.params.id;
  const now = new Date();
  let getTime = now.getTime();
  try {
    const test = await TestModel.find({ class: cls });
    const endTimeArray = test.map((item) => {
      return item.endTime * 1000;
    });
    let filter = endTimeArray.filter((item) => {
      return item >= getTime;
    })
    if (filter.length > 0) {
      let minEndTime = Math.min(...filter) / 1000;
      const testDetail = await TestModel.findOne({ class: cls, endTime: minEndTime });
      const startTime = testDetail.startTime;
      function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
      }
      const timesTamp = toTimestamp(now)
      const tt = 60 * testDetail.duration;
      const duration = startTime - timesTamp;
      const t = -1 * duration;
      return res.status(200).json({ testDetail: testDetail, timesTamp: timesTamp, tt: tt, t: t });
    }
  } catch (error) {
    console.log(error);
  }
}

let CreateTest = async (req, res, next) => {
  const now = new Date();
  let getTime = Math.floor(now.getTime() / 1000);
  let { subject, title, totalQuestion, duration, startTime, endTime } = req.body;
  let className = req.body.class;
  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum / 1000;
  }
  startTime = toTimestamp(startTime);
  endTime = (60 * duration) + startTime;
  const addTest = {
    class: className,
    subject: subject,
    title: title,
    totalQuestion: totalQuestion,
    duration: duration,
    startTime: startTime,
    endTime: endTime,
  }
  try {
    if (getTime >= startTime) {
      return res.status(400).json({errorMsg:"Please test schedule after current time"});
    }
    const checkTitle = await TestModel.findOne({ class: className, subject: subject, title: title });
    if (checkTitle) {
      return res.status(400).json({errorMsg:"Test already exist"});
    }
    const checkClassSubject = await ClassSubjectModel.findOne({ class: className, subject: subject});
    if (!checkClassSubject) {
      return res.status(404).json({errorMsg:`${subject} is not exist on class ${className}`});
    }
    const checkTiming = await TestModel.findOne({ startTime: startTime, class: className });
    if (checkTiming) {
      return res.status(400).json({errorMsg:`Test already schedule on this date and class ${className}`});
    }
    const check = await TestModel.find({ class: className });
    let endTimeArray = check.map((item) => { return item.endTime });
    let maxEndTime = Math.max(...endTimeArray);
    if (maxEndTime >= startTime) {
      return res.status(400).json({errorMsg:"Please test schedule after current time"});
    }
    // const countTest = await TestModel.find({ class: className }).count();
    // if (countTest == 5) {
    //   return res.status(400).json({errorMsg:`Class-${className} Test limit is over to 5`});
    // }
    const testDetail = await TestModel.create(addTest);
    return res.status(200).json({ testDetail, success: 'Test add succesfuly' });
  } catch (error) {
    console.log(error);
  }
}
let UpdateTest = async (req, res, next) => {

}
let DeleteTest = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteTest = await TestModel.findOneAndDelete({ _id: id });
    const deleteQuestions = await QuestionModel.deleteMany({ testId: id });

    return res.status(200).json('Test delete succesfuly');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  countTest,
  GetTestPagination,
  GetAllTest,
  GetSingleClassAllTest,
  GetSingleTest,
  GetSingleTestById,
  CreateTest,
  UpdateTest,
  DeleteTest,
}