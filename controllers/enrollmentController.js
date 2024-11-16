const Enrollment = require('../models/enrollmentModel');
const Progress = require('../models/progressModel');

const Course = require('../models/Course');
// const User = require('../models/User');

// Enroll a student in a course
exports.enrollStudent = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user.id;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Course not found' });
    }

    // Check if the student is already enrolled
    const existingEnrollment = await Enrollment.findOne({
      course: courseId,
      student: studentId,
    });
    if (existingEnrollment) {
      return res.status(400).json({
        status: 'fail',
        message: 'Student already enrolled in this course',
      });
    }

    // Create new enrollment
    const newEnrollment = await Enrollment.create({
      course: courseId,
      student: studentId,
    });

    // Create new progress record
    const newProgress = await Progress.create({
      student: studentId,
      course: courseId,
    });

    res.status(201).json({
      status: 'success',
      data: {
        enrollment: newEnrollment,
        progress: newProgress, // Include the new progress data in the response
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Get all enrollments for a specific student
exports.getStudentEnrollments = async (req, res) => {
  try {
    const { studentId } = req.params.studentId;

    const enrollments = await Enrollment.find({ student: studentId }).populate(
      'course',
    );
    res.status(200).json({
      status: 'success',
      results: enrollments.length,
      data: { enrollments },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
// Get all curriculum for a specific student
exports.getMyCurriculum = async (req, res) => {
  try {
    const studentId = req.user.id;

    const enrollments = await Enrollment.find({ student: studentId }).populate(
      'course',
    );
    res.status(200).json({
      status: 'success',
      results: enrollments.length,
      data: { enrollments },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Get all students enrolled in a specific course
exports.getCourseEnrollments = async (req, res) => {
  try {
    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this quiz',
      });
    }

    const { courseId } = req.params.courseId;

    const enrollments = await Enrollment.find({ course: courseId }).populate(
      'student',
    );
    res.status(200).json({
      status: 'success',
      results: enrollments.length,
      data: { enrollments },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
