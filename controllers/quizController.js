const Quiz = require('../models/quizModel');
const Lesson = require('../models/Lesson');

// Create a new quiz
exports.createQuiz = async (req, res) => {
  console.log('adding quiz', req.params);
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to create a quiz for this lesson',
      });
    }
    const lessonId = lesson._id;
    const { title, questions } = req.body;
    const quest = { title, questions, lesson: lessonId };
    const quiz = await Quiz.create(quest);

    res.status(201).json({
      status: 'success',
      data: {
        quiz,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Get all quizzes for a lesson
exports.getQuizzesByLesson = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ lesson: req.params.lessonId });
    res.status(200).json({
      status: 'success',
      results: quizzes.length,
      data: {
        quizzes,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Get a single quiz by ID
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Quiz not found' });
    }
    res.status(200).json({
      status: 'success',
      data: {
        quiz,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Update a quiz
exports.updateQuiz = async (req, res) => {
  try {
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this quiz',
      });
    }

    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!quiz) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Quiz not found' });
    }
    res.status(200).json({
      status: 'success',
      data: {
        quiz,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Delete a quiz
exports.deleteQuiz = async (req, res) => {
  try {
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this quiz',
      });
    }

    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Quiz not found' });
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

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
