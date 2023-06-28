const mongoose = require('mongoose');

const AdsModel = mongoose.model('ads', {
    title: {type: String},
    image:{type:String},
});

module.exports = AdsModel;
