const Progress = require('../models/progressModel');
// const Course = require('../models/Course');
// const Lesson = require('../models/Lesson');
// const CourseContent = require('../models/courseContentModel');

// Get progress for a student in a specific course
exports.getProgress = async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    })
      .populate('currentLesson')
      .populate('currentContent')
      .populate('completedLessons')
      .populate('completedContents');

    if (!progress) {
      return res.status(404).json({
        status: 'fail',
        message: 'Progress not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: progress,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Update progress (mark lesson or content as completed)
exports.updateProgress = async (req, res) => {
  const { studentId, courseId, lessonId, contentId } = req.body;

  try {
    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({
        status: 'fail',
        message: 'Progress not found',
      });
    }

    // Update current lesson and content
    if (lessonId) {
      progress.currentLesson = lessonId;
      progress.lessonCompleted = progress.completedLessons.includes(lessonId);

      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
    }

    if (contentId) {
      progress.currentContent = contentId;
      progress.contentCompleted =
        progress.completedContents.includes(contentId);

      if (!progress.completedContents.includes(contentId)) {
        progress.completedContents.push(contentId);
      }
    }

    // Update the progress
    progress.updatedAt = Date.now();
    await progress.save();

    res.status(200).json({
      status: 'success',
      data: progress,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};

// Track quiz score after quiz completion
exports.updateQuizScore = async (req, res) => {
  const { studentId, courseId, quizScore } = req.body;

  try {
    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({
        status: 'fail',
        message: 'Progress not found',
      });
    }

    progress.quizScore = quizScore;
    progress.updatedAt = Date.now();

    await progress.save();

    res.status(200).json({
      status: 'success',
      message: 'Quiz score updated successfully',
      data: progress,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
