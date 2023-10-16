const express = require('express');
const router = express.Router();
const {GetAllStudentByClass,countStudent,GetSingleStudent,CreateStudent,UpdateStudent,ChangeStatus,DeleteStudent, GetStudentPagination} = require('../controllers/student');

router.get('/student-count',countStudent);
router.get('/student/:class',GetAllStudentByClass);
router.post('/student-pagination',GetStudentPagination);
router.get('/:id',GetSingleStudent);
router.post('/',CreateStudent);
router.put('/:id',UpdateStudent);
router.put('/status/:id',ChangeStatus);
router.delete('/:id',DeleteStudent);



module.exports = router;