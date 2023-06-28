const express = require('express');
const router = express.Router();
const {GetSingleTestQuestion,CreateQuestion,CreateSaveAnswer} = require('../controllers/question');

router.get('/:id',GetSingleTestQuestion);
router.post('/', CreateQuestion);
router.post('/saveAnswer', CreateSaveAnswer);


module.exports = router;