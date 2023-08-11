const express = require('express');
const router = express.Router();
const {GetAllStudentAdmitCardByClass,GetSingleStudentAdmitCard,GetSingleStudentAdmitCardById} = require('../controllers/admit-card');

router.get('/class/:id',GetAllStudentAdmitCardByClass);
router.get('/student/:id',GetSingleStudentAdmitCardById);
router.post('/',GetSingleStudentAdmitCard);

module.exports = router;