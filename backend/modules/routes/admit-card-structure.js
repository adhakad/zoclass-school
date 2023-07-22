const express = require('express');
const router = express.Router();
const {CreateAdmitCardStructure} = require('../controllers/admit-card-structure');

router.post('/',CreateAdmitCardStructure);

module.exports = router;