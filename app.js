const cors = require('cors');
const express = require('express');
const usersRoutes = require('./routes/usersRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const progressRoutes = require('./routes/progressRoutes');
const courseContentRoutes = require('./routes/courseContentRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const quizRoutes = require('./routes/quizRoutes');
const quizSubmissionRoutes = require('./routes/quizSubmissionRoutes');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
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
app.use('/api/v1/quiz-submission', quizSubmissionRoutes);

app.get('/', (req, res) => res.send('Server is up and running'));

module.exports = app;
