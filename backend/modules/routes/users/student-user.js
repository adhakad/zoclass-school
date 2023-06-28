const express = require('express');
const router = express.Router();
const {SignupStudent,LoginStudent,RefreshToken} = require('../../controllers/users/student-user');

router.post('/signup',SignupStudent);
router.post('/login',LoginStudent);
router.post('/refresh',RefreshToken);



module.exports = router;