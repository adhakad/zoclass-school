const express = require('express');
const router = express.Router();
const {GetSingleClassExamResultStructure,GetSingleClassExamResultStructureByStream,CreateExamResultStructure} = require('../controllers/exam-result-structure');

router.post('/',CreateExamResultStructure);
router.get('/:id',GetSingleClassExamResultStructure);
router.get('/class/:class/stream/:stream/exam/:exam',GetSingleClassExamResultStructureByStream);

module.exports = router;