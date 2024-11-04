const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson', // Reference to the lesson the quiz belongs to
    required: [true, 'A quiz must be linked to a lesson'],
  },
  title: {
    type: String,
    required: [true, 'A quiz must have a title'],
  },
  questions: [
    {
      questionText: {
        type: String,
        required: [true, 'Each question must have text'],
      },
      options: [
        {
          optionText: {
            type: String,
            required: [true, 'Each option must have text'],
          },
          isCorrect: {
            type: Boolean,
            default: false,
          },
        },
      ],
    },
  ],
  certificationQuiz: {
    type: Boolean,
    default: false, // Specifies if this quiz is for certification
  },
  passingScore: {
    type: Number,
    default: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quiz', quizSchema);
