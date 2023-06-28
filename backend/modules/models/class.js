const mongoose = require('mongoose');

const ClassModel = mongoose.model('class', {
    class: {type: Number},
});

module.exports = ClassModel;
