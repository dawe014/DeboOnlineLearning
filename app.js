const cors = require('cors');
const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const progressRoutes = require('./routes/progressRoutes');
const courseContentRoutes = require('./routes/courseContentRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const quizRoutes = require('./routes/quizRoutes');
const quizSubmission = require('./routes/quizSubmission');
const certificateRouter = require('./routes/certificateRouter');
const statisticsRouter = require('./routes/statisticsRouter');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*', // Replace with your computer's local IP
  }),
);

// API Routes
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/lessons', lessonRoutes);
app.use('/api/v1/contents', courseContentRoutes);
app.use('/api/v1/enrollments', enrollmentRoutes);
app.use('/api/v1/progress', progressRoutes);
app.use('/api/v1/quizzes', quizRoutes);
app.use('/api/v1/quizSubmissions', quizSubmission);
app.use('/api/v1/certificate', certificateRouter);
app.use('/api/v1/stats', statisticsRouter);

app.get('/', (req, res) => res.send('Server is up and running'));

module.exports = app;
