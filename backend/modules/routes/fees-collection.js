const express = require('express');
const router = express.Router();
const {CreateFeesCollection} = require('../controllers/fees-collection');

router.post('/',CreateFeesCollection);

module.exports = router;