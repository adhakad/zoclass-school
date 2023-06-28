const mongoose = require('mongoose');

const BannerModel = mongoose.model('banner', {
    title: {type: String},
    image:{type:String},
});

module.exports = BannerModel;
