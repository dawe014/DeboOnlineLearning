const QuizSubmission = require('../models/QuizSubmissionModel');
const Quiz = require('../models/quizModel');
const Enrollment = require('../models/enrollmentModel');
// Submit a quiz
exports.submitQuiz = async (req, res) => {
  try {
    const { lessonId, correctCount, courseId, questionLen, quizId, answers } =
      req.body;
    const userId = req.user.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const score = (correctCount / questionLen) * 100;

    // Create a new quiz submission
    const submission = new QuizSubmission({
      userId,
      lessonId,
      quizId,
      answers,
      score,
    });

    const response = await submission.save();
    console.log(response);

    const passingScore = quiz.passingScore || 50; // Default to 50 if passing score is not set
    let isCertified = false;
    if (quiz.certificationQuiz) {
      isCertified = score >= passingScore;
    }
    if (quiz.certificationQuiz) {
      await Enrollment.findOneAndUpdate(
        { student: userId, course: courseId }, // Assumes lessonId links to a course
        { $set: { certified: isCertified } },
        { new: true },
      );
    }
    res.status(201).json({
      message: 'Quiz submitted successfully!',
      submission,
      isCertified,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit quiz', error: error });
  }
};

// Get all submissions for a specific user
exports.getUserSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;

    const submissions = await QuizSubmission.find({ userId }).populate(
      'quizId lessonId',
    );
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch user submissions',
      error: error.message,
    });
  }
};

// Get all submissions for a specific quiz
exports.getQuizSubmissions = async (req, res) => {
  try {
    const { quizId, lessonId } = req.params;
    const userId = req.user.id;

    const submissions = await QuizSubmission.findOne({
      quizId,
      userId,
      lessonId,
    });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch quiz submissions',
      error: error.message,
    });
  }
};

// Grade a quiz submission
exports.gradeQuiz = async (req, res) => {
  try {
    const { submissionId } = req.params;

    // Fetch the submission and the corresponding quiz
    const submission =
      await QuizSubmission.findById(submissionId).populate('quizId');
    if (!submission) {
      return res.status(404).json({ message: 'Quiz submission not found' });
    }

    const quiz = await Quiz.findById(submission.quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate the score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      const userAnswer = submission.answers.find(
        (a) => a.questionIndex === index,
      );
      if (userAnswer) {
        const correctOption = question.options.find(
          (option) => option.isCorrect,
        );
        const correctIndex = question.options.indexOf(correctOption);
        if (userAnswer.selectedOptionIndex === correctIndex) {
          score += 1;
        }
      }
    });

    const totalQuestions = quiz.questions.length;
    const percentageScore = (score / totalQuestions) * 100;
    const passed = percentageScore >= quiz.passingScore;

    // Update the submission with the score and pass status
    submission.score = percentageScore;
    submission.passed = passed;
    await submission.save();

    res.status(200).json({ message: 'Quiz graded successfully', submission });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to grade quiz', error: error.message });
  }
};
