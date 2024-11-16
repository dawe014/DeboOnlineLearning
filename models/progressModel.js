const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Progress must belong to a student'],
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Progress must belong to a course'],
  },
  currentLesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  currentContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseContent',
  },
  contentCompleted: {
    type: Boolean,
    default: false,
  },
  completedLessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  ],
  completedContents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CourseContent',
    },
  ],
  lessonCompleted: {
    type: Boolean,
    default: false,
  },
  quizScore: {
    type: Number,
    default: null,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Progress', progressSchema);
