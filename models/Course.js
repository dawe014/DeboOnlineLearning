const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A course must have a title'],
    trim: true,
    maxlength: [100, 'Course title must have less or equal to 100 characters'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'A course must have a description'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'A course must have a category'],
    enum: [
      'Web Development',
      'Data Science',
      'Design',
      'Marketing',
      'Business',
      'Others',
    ],
    default: 'Others',
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A course must have an instructor'],
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson', // Reference to Lesson schema
    },
  ],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft', // Default status when a course is created
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Course', courseSchema);
