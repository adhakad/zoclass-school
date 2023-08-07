const express = require('express');
const router = express.Router();
const fileUpload = require('../helpers/file-upload')
// const {GetAdmissionPagination,countAdmission,GetAllAdmission,GetSingleAdmission,CreateAdmission,UpdateAdmission,DeleteAdmission} = require('../controllers/admission');
const {CreateAdmission,GetAdmissionPagination} = require('../controllers/admission');
// const { isAdminAuth } = require('../middleware/admin-auth');

// router.get('/admission-count',countAdmission);
// router.get('/',GetAllAdmission);
router.post('/admission-pagination',GetAdmissionPagination);
// router.get('/:id',GetSingleAdmission);
router.post('/',CreateAdmission);
// router.put('/:id',UpdateAdmission);
// router.delete('/:id',DeleteAdmission);



module.exports = router;