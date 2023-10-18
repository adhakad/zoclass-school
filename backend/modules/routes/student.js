const express = require('express');
const router = express.Router();
const {GetAllStudentByClass,countStudent,GetSingleStudent,CreateStudent,CreateBulkStudentRecord,UpdateStudent,ChangeStatus,DeleteStudent, GetStudentPaginationByClass,GetStudentPaginationByAdmission} = require('../controllers/student');

router.get('/student-count',countStudent);
router.get('/student/:class',GetAllStudentByClass);
router.post('/student-pagination',GetStudentPaginationByClass);
router.post('/student-admission-pagination',GetStudentPaginationByAdmission);
router.get('/:id',GetSingleStudent);
router.post('/',CreateStudent);
router.post('/bulk-student-record',CreateBulkStudentRecord);
router.put('/:id',UpdateStudent);
router.put('/status/:id',ChangeStatus);
router.delete('/:id',DeleteStudent);



module.exports = router;