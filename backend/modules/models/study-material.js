const mongoose = require('mongoose');

const StudyMaterialModel = mongoose.model('study-material', {
    class:{type:Number},
    subject:{type:String},
    creator:{type:String},
    title: {type: String},
    tags:{type:String},
    content:{type:String},
    date:{type:Number},
});

module.exports = StudyMaterialModel;