'use strict';
const express = require('express');
const router = express.Router();
const { LoginAdmin, RefreshToken } = require('../../controllers/users/admin-user');

router.post('/login', LoginAdmin);
router.post('/refresh', RefreshToken);

module.exports = router;