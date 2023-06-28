'use strict';

module.exports = app => {
    app.use('/api/admin', require('./modules/routes/users/admin-user'));
    app.use('/api/ads', require('./modules/routes/ads'));
    app.use('/api/banner', require('./modules/routes/banner'));
    app.use('/api/class', require('./modules/routes/class'));
    app.use('/api/class-subject', require('./modules/routes/class-subject'));
    app.use('/api/question', require('./modules/routes/question'));
    app.use('/api/student', require('./modules/routes/student'));
    app.use('/api/subject', require('./modules/routes/subject'));
    app.use('/api/teacher', require('./modules/routes/teacher'));
    app.use('/api/test', require('./modules/routes/test'));
    app.use('/api/testimonial', require('./modules/routes/testimonial'));
    app.use('/api/topper', require('./modules/routes/topper'));
    app.use('/api/study-material', require('./modules/routes/study-material'));
    app.use('/api/notification', require('./modules/routes/notification'));
    app.use('/api/student-user', require('./modules/routes/users/student-user'));
    app.use('/api/teacher-user', require('./modules/routes/users/teacher-user'));
    app.use('/api/exam-result', require('./modules/routes/exam-result'));
};