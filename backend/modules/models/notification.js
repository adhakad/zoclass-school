'use strict';
const mongoose = require('mongoose');

const NotificationModel = mongoose.model('notification', {
    title: { type: String },
    message: { type: String },
    role: {
        type: String,
        enum: ["Student", "Teacher", "Public"],
    },
    class: { type: Number},
    date: { type: Number },


});

module.exports = NotificationModel;
