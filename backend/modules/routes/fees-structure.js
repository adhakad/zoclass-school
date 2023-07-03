const express = require('express');
const router = express.Router();
const {CreateFeesStructure} = require('../controllers/fees-structure');

router.post('/',CreateFeesStructure);

module.exports = router;