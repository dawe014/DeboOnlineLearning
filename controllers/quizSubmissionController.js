const Quiz = require('../models/quizModel');

// Submit quiz and grade
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    // Get the quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Quiz not found' });
    }

    // Calculate score
    let score = 0;
    const totalQuestions = quiz.questions.length;

    quiz.questions.forEach((question, index) => {
      if (
        answers[index] &&
        answers[index] ===
          question.options.find((opt) => opt.isCorrect).optionText
      ) {
        score += 1;
      }
    });

    res.status(200).json({
      status: 'success',
      data: {
        score,
        totalQuestions,
        percentage: (score / totalQuestions) * 100,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
