const mongoose = require('mongoose');

const lessonContentSchema = new mongoose.Schema({
  contentTitle: {
    type: String,
    required: [true, 'A content must have a title'],
    unique: true,
  },
  type: {
    type: String,
    enum: ['video', 'article', 'quiz', 'other'],
    required: [true, 'Content type is required'],
  },
  url: {
    type: String, // URL for videos
    required: function () {
      return this.type === 'video';
    }, // URL is required if content type is video
  },
  text: {
    type: String, // Text for articles
    required: function () {
      return this.type === 'article';
    }, // Text is required if content type is article
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz', // Reference to Quiz schema
    required: function () {
      return this.type === 'quiz';
    }, // Quiz is required if content type is quiz
  },
});

module.exports = mongoose.model('lessonContent', lessonContentSchema);
