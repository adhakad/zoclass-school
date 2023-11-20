'use strict';
const tokenService = require('../../services/admin-token');
const AdminUserModel = require('../../models/users/admin-user');

let LoginAdmin = async (req, res, next) => {
    try {
        let admin = await AdminUserModel.findOne({ email: req.body.email, password: req.body.password })
        if (!admin) {
            return res.status(404).json({ errorMsg: 'Username or password invalid !' });
        }
        if (admin.status == "Inactive") {
            return res.status(400).json({ errorMsg: 'Login permission blocked, please contact app development company !' });
        }
        if (admin.status == "Active") {
            const payload = { id: admin._id, email: admin.email };
            const accessToken = await tokenService.getAccessToken(payload);
            const refreshToken = await tokenService.getRefreshToken(payload);
            return res.status(200).json({ adminInfo: admin, accessToken, refreshToken });
        }
        return res.status(400).json({ errorMsg: 'Login error !' })
    } catch (error) {
        return res.status(500).json({ errorMsg: 'Internal Server Error !' });
    }
}

let RefreshToken = async (req, res, next) => {
    try {
        const { token } = req.body
        if (token) {
            const payload = await tokenService.verifyRefreshToken(token)
            const accessToken = await tokenService.getAccessToken(payload)
            res.send({ accessToken })
        }
        else {
            res.status(403).send('token Unavailable!!')
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
module.exports = {
    LoginAdmin,
    RefreshToken
}