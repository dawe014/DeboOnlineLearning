const mongoose = require('mongoose');

const quizSubmissionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // The user who submitted the quiz
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true, // Links the submission to a specific quiz
  },
  answers: [
    {
      questionIndex: {
        type: Number,
        required: true, // Index of the question in the quiz's "questions" array
      },
      selectedOptionIndex: {
        type: Number,
        required: true, // Index of the selected option in the "options" array
      },
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now, // Tracks submission time
  },
  score: {
    type: Number,
    default: 0, // To store the score after grading
  },
  passed: {
    type: Boolean,
    default: null, // Indicates if the user passed the quiz
  },
});
quizSubmissionSchema.index(
  { userId: 1, lessonId: 1, quizId: 1 },
  { unique: true },
);

module.exports = mongoose.model('QuizSubmission', quizSubmissionSchema);
