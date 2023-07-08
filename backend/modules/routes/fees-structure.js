const express = require('express');
const router = express.Router();
const {GetSingleClassFeesStructure,CreateFeesStructure} = require('../controllers/fees-structure');

router.post('/',CreateFeesStructure);
router.get('/:id',GetSingleClassFeesStructure);

module.exports = router;