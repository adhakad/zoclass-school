const mongoose = require('mongoose');

const TestimonialModel = mongoose.model('testimonial', {
    name: {type: String},
    role:{type:String},
    image:{type:String},
    desc:{type:String},
});

module.exports = TestimonialModel;
