const express = require('express');
const router = express.Router();
const {GetAllTest,countTest,GetSingleTestById,GetSingleClassAllTest,GetSingleTest,CreateTest,DeleteTest, GetTestPagination} = require('../controllers/test');

router.get('/test-count',countTest);
router.get('/',GetAllTest);
router.post('/test-pagination',GetTestPagination);
router.get('/:id',GetSingleTest);
router.get('/single-test/:id',GetSingleTestById);
router.get('/test/:id',GetSingleClassAllTest);
router.post('/', CreateTest);
router.delete('/:id',DeleteTest);

module.exports = router;