const express = require('express');
const router = express.Router();
const {GetSingleClassAdmitCardStructure,CreateAdmitCardStructure} = require('../controllers/admit-card-structure');


router.get('/:id',GetSingleClassAdmitCardStructure);
router.post('/',CreateAdmitCardStructure);

module.exports = router;