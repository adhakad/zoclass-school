'use strict';
const bcrypt = require('bcrypt');
const tokenService = require('../../services/admin-token');
const AdminUserModel = require('../../models/users/admin-user');
const SchoolKeyModel = require('../../models/users/school-key');

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

let SignupAdmin = async (req, res, next) => {
    const { email, password, productKey } = req.body;
    try {
        const checkUser = await AdminUserModel.findOne({ email: email });
        if (checkUser) {
            return res.status(400).json("Admin already signup !");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        let adminData = {
            email: email,
            password: hashedPassword,
        }
        const createSignupAdmin = await AdminUserModel.create(adminData);
        if (createSignupAdmin) {
            return res.status(200).json('Sign up F successfully.');
        }
    } catch (error) {
        return res.status(500).json({ errorMsg: 'Internal Server Error !' });;
    }
}

// let CreateProductKey = async (req, res, next) => {
    
//     const {productKey }= req.body;
    
    
//     try {
//         let countProductKey = await SchoolKeyModel.count();
//         if(countProductKey === 1){
//             return res.status(400).json("Invalid entry !");
//         }
//         const checkProductKey = await SchoolKeyModel.findOne({ productKey: productKey });
//         if (checkProductKey) {
//             return res.status(400).json("Invalid entry !");
//         }
//         const hashedProductKey = await bcrypt.hash(productKey, 10);
//         let productKeyData = {
//             productKey: hashedProductKey,
//             status:'Inactive',
//         }
//         const createProductKey = await SchoolKeyModel.create(productKeyData);
//         if (createProductKey) {
//             return res.status(200).json('Product key created successfully.');
//         }
//     } catch (error) {
//         return res.status(500).json({ errorMsg: 'Internal Server Error !' });;
//     }
// }
module.exports = {
    LoginAdmin,
    RefreshToken,
    // CreateProductKey,
    SignupAdmin
}