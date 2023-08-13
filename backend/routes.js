'use strict';

module.exports = app => {
    app.use('/api/admin', require('./modules/routes/users/admin-user'));
    app.use('/api/ads', require('./modules/routes/ads'));
    app.use('/api/banner', require('./modules/routes/banner'));
    app.use('/api/class', require('./modules/routes/class'));
    app.use('/api/class-subject', require('./modules/routes/class-subject'));
    app.use('/api/student', require('./modules/routes/student'));
    app.use('/api/subject', require('./modules/routes/subject'));
    app.use('/api/teacher', require('./modules/routes/teacher'));
    app.use('/api/testimonial', require('./modules/routes/testimonial'));
    app.use('/api/topper', require('./modules/routes/topper'));
    app.use('/api/notification', require('./modules/routes/notification'));
    app.use('/api/student-user', require('./modules/routes/users/student-user'));
    app.use('/api/teacher-user', require('./modules/routes/users/teacher-user'));
    app.use('/api/exam-result', require('./modules/routes/exam-result'));
    app.use('/api/fees', require('./modules/routes/fees-collection'));
    app.use('/api/fees-structure', require('./modules/routes/fees-structure'));
    app.use('/api/admission', require('./modules/routes/admission'));
    app.use('/api/admit-card-structure', require('./modules/routes/admit-card-structure'));
    app.use('/api/admit-card', require('./modules/routes/admit-card'));
};