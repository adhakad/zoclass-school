const express = require('express');
const router = express.Router();
const {GetAllStudentAdmitCardByClass,GetSingleStudentAdmitCard} = require('../controllers/admit-card');

router.get('/class/:id',GetAllStudentAdmitCardByClass);
// router.get('/student/:id',GetSingleStudentAdmitCard);

module.exports = router;