const Course = require('../models/Course');
const User = require('../models/User');

// Controller to fetch certificate details
exports.getCertificateDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Simulate fetching the logged-in user's data
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Fetch course details
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Return user name and course title
    res.status(200).json({
      userName: user.name,
      courseName: course.title,
    });
  } catch (error) {
    console.error('Error fetching certificate details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
