const express = require('express');
const router = express.Router();
const {GetSingleSchool,CreateSchool,UpdateSchool,DeleteSchool} = require('../controllers/school');


router.get('/',GetSingleSchool);
router.post('/',CreateSchool);
router.put('/:id',UpdateSchool);
router.delete('/:id',DeleteSchool);

module.exports = router;