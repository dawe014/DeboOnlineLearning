const Progress = require('../models/progressModel');
const Course = require('../models/Course');

// const Course = require('../models/Course');
// const Lesson = require('../models/Lesson');
// const CourseContent = require('../models/courseContentModel');

// Get progress for a student in a specific course
exports.getProgress = async (req, res) => {
  const { studentId, courseId } = req.params;
  console.log('progress', req.params);
  try {
    const progress = await Progress.find({
      student: studentId,
      course: courseId,
    });
    console.log('the progress', progress);
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
exports.myProgress = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.id;
  console.log('progress', req.params);
  try {
    const progress = await Progress.find({
      student: studentId,
      course: courseId,
    });
    console.log('the progress', progress);
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
  console.log('from progress controller', req.user.id);
  const { courseId, contentId, lessonId, completedContentId } = req.body;
  const studentId = req.user.id;
  try {
    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });
    console.log(progress);

    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    // Update completed contents
    if (
      completedContentId &&
      !progress.completedContents.includes(completedContentId)
    ) {
      progress.completedContents.push(completedContentId);
    }

    // Update current lesson and content
    progress.currentContent = contentId;
    progress.currentLesson = lessonId;

    // Check if the lesson is completed
    const course = await Course.findById(courseId).populate({
      path: 'lessons',
      populate: {
        path: 'contents',
      },
    });
    const lesson = course.lessons.find(
      (curLesson) => curLesson._id.toString() === lessonId,
    );
    console.log(lesson);
    const allContentsCompleted = lesson.contents.every((content) =>
      progress.completedContents.includes(content._id),
    );
    console.log('allcontent completed', allContentsCompleted);

    if (allContentsCompleted && !progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
      progress.lessonCompleted = true;
    }

    // Save the updated progress
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
    const progress = await Progress.find({
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

exports.calculateMyProgress = async (req, res) => {
  const { courseId } = req.params;
  const studentId = req.user.id;
  try {
    // Fetch the progress document for the student in the specified course
    console.log('Fetching progress...');
    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({
        status: 'fail',
        message: 'Progress not found for this course and student',
      });
    }

    console.log('Fetching course...');
    // Fetch the course to get total lessons and contents
    const course = await Course.findById(courseId).populate({
      path: 'lessons', // Populate lessons
      populate: {
        path: 'contents', // Populate contents within each lesson
      },
    });

    if (!course) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Course not found' });
    }

    // Calculate total lessons and contents
    const totalLessons = course.lessons.length;
    let totalContents = 0;

    course.lessons.forEach((lesson) => {
      totalContents += lesson.contents ? lesson.contents.length : 0;
    });

    // Calculate completed lessons and contents
    const completedLessons = progress.completedLessons.length;
    const completedContents = progress.completedContents.length;

    // Calculate progress percentages
    const lessonProgressPercentage =
      totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;
    const contentProgressPercentage =
      totalContents === 0 ? 0 : (completedContents / totalContents) * 100;

    // Overall progress can be a weighted average or a simple average
    const overallProgress =
      (lessonProgressPercentage + contentProgressPercentage) / 2;

    res.status(200).json({
      status: 'success',
      data: {
        lessonProgress: lessonProgressPercentage.toFixed(2),
        contentProgress: contentProgressPercentage.toFixed(2),
        overallProgress: overallProgress.toFixed(2),
      },
    });
  } catch (err) {
    console.error('Error calculating progress:', err.message);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while calculating progress',
    });
  }
};
exports.calculateProgress = async (req, res) => {
  const { studentId, courseId } = req.params;

  try {
    // Fetch the progress document for the student in the specified course
    console.log('Fetching progress...');
    const progress = await Progress.findOne({
      student: studentId,
      course: courseId,
    });

    if (!progress) {
      return res.status(404).json({
        status: 'fail',
        message: 'Progress not found for this course and student',
      });
    }

    console.log('Fetching course...');
    // Fetch the course to get total lessons and contents
    const course = await Course.findById(courseId).populate({
      path: 'lessons', // Populate lessons
      populate: {
        path: 'contents', // Populate contents within each lesson
      },
    });

    if (!course) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Course not found' });
    }

    // Calculate total lessons and contents
    const totalLessons = course.lessons.length;
    let totalContents = 0;

    course.lessons.forEach((lesson) => {
      totalContents += lesson.contents ? lesson.contents.length : 0;
    });

    // Calculate completed lessons and contents
    const completedLessons = progress.completedLessons.length;
    const completedContents = progress.completedContents.length;

    // Calculate progress percentages
    const lessonProgressPercentage =
      totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;
    const contentProgressPercentage =
      totalContents === 0 ? 0 : (completedContents / totalContents) * 100;

    // Overall progress can be a weighted average or a simple average
    const overallProgress =
      (lessonProgressPercentage + contentProgressPercentage) / 2;

    res.status(200).json({
      status: 'success',
      data: {
        lessonProgress: lessonProgressPercentage.toFixed(2),
        contentProgress: contentProgressPercentage.toFixed(2),
        overallProgress: overallProgress.toFixed(2),
      },
    });
  } catch (err) {
    console.error('Error calculating progress:', err.message);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while calculating progress',
    });
  }
};
