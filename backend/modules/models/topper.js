const mongoose = require('mongoose');

const TopperModel = mongoose.model('topper', {
    name: {type: String},
    class:{type:Number},
    percentile:{type:Number},
    year:{type:Number},
    image:{type:String},
});

module.exports = TopperModel;
