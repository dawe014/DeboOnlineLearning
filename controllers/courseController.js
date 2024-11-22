const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('lessons');
    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: { courses },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Get a specific course by ID
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: 'lessons',
      populate: {
        path: 'contents',
        populate: {
          path: 'quiz',
        },
      },
    });

    if (!course) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Course not found' });
    }
    res.status(200).json({ status: 'success', data: { course } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const newCourse = await Course.create({
      title,
      description,
      category,
      instructor: req.user.id,
    });
    res.status(201).json({ status: 'success', data: { course: newCourse } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Update a course
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if (
      req.user.id !== course.instructor.toString() &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'Not authorized to update this course' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedCourse) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Course not found' });
    }
    res
      .status(200)
      .json({ status: 'success', data: { course: updatedCourse } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  try {
    const courseOwner = await Course.findById(req.params.id);
    if (!courseOwner) {
      return res.status(404).json({ message: 'Course not found' });
    }
    if (
      req.user.id !== courseOwner.instructor.toString() &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this course' });
    }

    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Course not found' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
