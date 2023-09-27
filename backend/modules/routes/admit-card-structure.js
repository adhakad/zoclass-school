const express = require('express');
const router = express.Router();
const {GetSingleClassAdmitCardStructure,CreateAdmitCardStructure,DeleteAdmitCardStructure} = require('../controllers/admit-card-structure');


router.get('/:id',GetSingleClassAdmitCardStructure);
router.post('/',CreateAdmitCardStructure);
router.delete('/:id',DeleteAdmitCardStructure);

module.exports = router;