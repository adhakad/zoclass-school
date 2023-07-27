const express = require('express');
const router = express.Router();
const {GetSingleClassAdmitCard,GetSingleStudentAdmitCard} = require('../controllers/admit-card');

router.get('/:id',GetSingleClassAdmitCard);
router.get('/student/:id',GetSingleStudentAdmitCard);

module.exports = router;