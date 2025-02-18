const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/enrollmentModel');

// Admin Statistics Controller
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    res.status(200).json({
      totalUsers,
      totalCourses,
      totalEnrollments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};

// Instructor Statistics Controller
const getInstructorStats = async (req, res) => {
  const { instructorId } = req.params;
  // const instructor = instructorId;
  try {
    const courses = await Course.find({
      instructor: instructorId,
    });
    const courseIds = courses.map((course) => course._id);
    const totalEnrollments = await Enrollment.countDocuments({
      course: { $in: courseIds },
    });

    res.status(200).json({
      totalCourses: courses.length,
      totalEnrollments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
};

module.exports = { getAdminStats, getInstructorStats };
