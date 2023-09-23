const express = require('express');
const router = express.Router();
const {GetSingleStudentFeesCollectionById,GetAllStudentFeesCollectionByClass,CreateFeesCollection} = require('../controllers/fees-collection');


router.get('/student/:studentId',GetSingleStudentFeesCollectionById);
router.get('/class/:class',GetAllStudentFeesCollectionByClass);

router.post('/',CreateFeesCollection);

module.exports = router;