const express = require('express');
const router = express.Router();
const {GetStudentResult,GetStudentSubjectTestResults,GetSingleStudentTestResult,GetSingleStudentAllResult,GetSingleTestAllResults,CreateTestResult} = require('../controllers/test-result');

router.get('/test/:testId/student/:id',GetSingleStudentTestResult);
router.get('/test/subject/:subjectId/student/:id',GetStudentSubjectTestResults);
router.get('/:id',GetStudentResult);
router.get('/student-results/:id',GetSingleStudentAllResult);
router.get('/test-results/:id',GetSingleTestAllResults);
router.post('/',CreateTestResult);
module.exports = router;