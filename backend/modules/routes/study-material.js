const express = require('express');
const router = express.Router();
const {isTeacherAuth} = require('../middleware/teacher-auth')
const {GetAllStudyMaterial,countStudyMaterial,GetSingleBlog,GetStudyMaterialByClassSubject,GetStudyMaterialBySubject,CreateStudyMaterial,UpdateStudyMaterial,DeleteStudyMaterial, GetStudyMaterialPagination} = require('../controllers/study-material');

router.get('/study-material-count',countStudyMaterial);
router.get('/',GetAllStudyMaterial);
router.post('/study-material-pagination',GetStudyMaterialPagination);
router.get('/:id',GetSingleBlog);
router.get('/class-subject/:class/:subject',GetStudyMaterialByClassSubject);
router.get('/subject/:subject/:class',GetStudyMaterialBySubject);
router.post('/',CreateStudyMaterial);
router.put('/:id',UpdateStudyMaterial);
router.delete('/:id',DeleteStudyMaterial);

module.exports = router;