const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lessonTitle: {
    type: String,
    required: [true, 'A lesson must have a title'],
  },
  contents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'lessonContent', // Reference to CourseContent schema
    },
  ],
});

module.exports = mongoose.model('Lesson', lessonSchema);
