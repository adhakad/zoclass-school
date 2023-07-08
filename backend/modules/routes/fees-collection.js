const express = require('express');
const router = express.Router();
const {GetSingleStudentFeesCollection,GetAllStudentFeesCollectionByClass,CreateFeesCollection} = require('../controllers/fees-collection');


router.get('/:id/student/:rollNumber',GetSingleStudentFeesCollection);
router.get('/student/:class',GetAllStudentFeesCollectionByClass);

router.post('/',CreateFeesCollection);

module.exports = router;