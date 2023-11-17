'use strict';
const mongoose = require('mongoose');

const AdminModel = mongoose.model('admin-users', {
    email:{type:String},
    password:{type:String},
    status:{
        type: String,
        enum : ['Active','Inactive'],
        default: 'Active'
    }
});

module.exports = AdminModel;
