const Lesson = require('../models/Lesson');
const Course = require('../models/Course');

// Get all lessons
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json({
      status: 'success',
      results: lessons.length,
      data: { lessons },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Get a specific lesson by ID
exports.getLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate('contents');
    if (!lesson) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Lesson not found' });
    }
    res.status(200).json({ status: 'success', data: { lesson } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Create a new lesson
exports.createLesson = async (req, res) => {
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
        .json({ message: 'Not authorized to create a lesson for this course' });
    }

    const newLesson = await Lesson.create(req.body);

    course.lessons.push(newLesson._id);
    await course.save();

    res.status(201).json({ status: 'success', data: { lesson: newLesson } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Update a lesson
exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    if (
      req.user.id !== lesson.instructor.toString() &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'Not authorized to update this lesson' });
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedLesson) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Lesson not found' });
    }
    res
      .status(200)
      .json({ status: 'success', data: { lesson: updatedLesson } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Delete a lesson
exports.deleteLesson = async (req, res) => {
  try {
    const lessonOwn = await Lesson.findById(req.params.id);
    if (!lessonOwn) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    if (
      req.user.id !== lessonOwn.instructor.toString() &&
      req.user.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'Not authorized to update this lesson' });
    }

    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Lesson not found' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
