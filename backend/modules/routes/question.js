const express = require('express');
const router = express.Router();
const {GetSingleTestQuestion,CreateQuestion} = require('../controllers/question');

router.get('/:id',GetSingleTestQuestion);
router.post('/', CreateQuestion);
// router.post('/saveAnswer', CreateSaveAnswer);


module.exports = router;