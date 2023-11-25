'use strict';
const express = require('express');
const router = express.Router();
const { LoginAdmin, RefreshToken, SignupAdmin, VarifyForgotAdmin, ResetForgotAdmin } = require('../../controllers/users/admin-user');

router.post('/login', LoginAdmin);
router.post('/refresh', RefreshToken);
router.post('/signup', SignupAdmin);
router.post('/varify-admin', VarifyForgotAdmin);
router.post('/reset-username-password', ResetForgotAdmin);

// router.post('/product-key', CreateProductKey);

module.exports = router;