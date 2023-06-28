const QuestionModel = require('../models/question');
const SaveAnswerModel = require('../models/userAnswerSave');

let GetSingleTestQuestion = async (req, res, next) => {
  try {
    const question = await QuestionModel.find({testId:req.params.id});
    return res.status(200).json({question: question});
  } catch (error) {
    console.log(error);
  }
}
let CreateQuestion = async (req, res, next) => {
  try {
    for (var i = 0; i < req.body[0].data.type.option.length; i++) {
      let qid = i + 1;
      const addQuestion = {
        testId: req.body[0].testId,
        questionId: qid,
        questionText: req.body[0].data.type.option[i].questionText,
        option1: req.body[0].data.type.option[i].option1,
        option2: req.body[0].data.type.option[i].option2,
        option3: req.body[0].data.type.option[i].option3,
        option4: req.body[0].data.type.option[i].option4,
        ansId: req.body[0].data.type.option[i].ansId,
      }
      const question = await QuestionModel.create(addQuestion);
      if(req.body[0].data.type.option.length == question.questionId){
       return res.status(200).json('Add test and questions successfully');
      }
    }
  } catch (error) {
    console.log(error);
  }
}
let UpdateQuestion = async (req, res, next) => {

}
let DeleteQuestion = async (req, res, next) => {

}
let CreateSaveAnswer = async (req, res, next) => {
  try {
    for (var i = 0; i < req.body.length; i++) {
      let createData =
      {
        questionNo: req.body[i].queNo,
        selectAnswer: req.body[i].selectAnswer,
        ansId: req.body[i].ansId,
      }
      await SaveAnswerModel.create(createData);
    }
    return res.status(200).json('Answer add successfuly');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  GetSingleTestQuestion,
  CreateQuestion,
  UpdateQuestion,
  DeleteQuestion,
  CreateSaveAnswer,
}