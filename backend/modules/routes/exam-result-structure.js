const express = require('express');
const router = express.Router();
const {GetSingleClassExamResultStructure,CreateExamResultStructure} = require('../controllers/exam-result-structure');

router.post('/',CreateExamResultStructure);
router.get('/:id',GetSingleClassExamResultStructure);

module.exports = router;