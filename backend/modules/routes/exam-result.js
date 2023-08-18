const express = require('express');
const router = express.Router();
const {GetSingleStudentExamResult,GetExamResultPagination,CreateExamResult,CreateBulkExamResult} = require('../controllers/exam-result');

router.post('/exam-result-pagination',GetExamResultPagination);
router.post('/',CreateExamResult);
router.post('/bulk-exam-result',CreateBulkExamResult);
router.post('/result',GetSingleStudentExamResult);
module.exports = router;