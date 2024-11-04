const LessonContent = require('../models/LessonContent');
const Lesson = require('../models/Lesson');

// Get all course contents
exports.getAllContents = async (req, res) => {
  try {
    const contents = await LessonContent.find();
    res.status(200).json({
      status: 'success',
      results: contents.length,
      data: { contents },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Get specific content by ID
exports.getContent = async (req, res) => {
  try {
    const content = await LessonContent.findById(req.params.id);
    if (!content) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Content not found' });
    }
    res.status(200).json({ status: 'success', data: { content } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Create new course content
exports.createContent = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to create a content for this lesson',
      });
    }

    const newContent = await LessonContent.create(req.body);

    lesson.contents.push(newContent._id);
    await lesson.save();

    res.status(201).json({ status: 'success', data: { content: newContent } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Update content
exports.updateContent = async (req, res) => {
  try {
    const content = await LessonContent.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this content',
      });
    }

    const updatedContent = await LessonContent.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedContent) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Content not found' });
    }
    res
      .status(200)
      .json({ status: 'success', data: { content: updatedContent } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Delete content
exports.deleteContent = async (req, res) => {
  try {
    const contentown = await LessonContent.findById(req.params.id);
    if (!contentown) {
      return res.status(404).json({ message: 'Content not found' });
    }

    if (req.user.role !== 'instructor' && req.user.role !== 'admin') {
      return res.status(403).json({
        message: 'Not authorized to update this content',
      });
    }

    const content = await LessonContent.findByIdAndDelete(req.params.id);
    if (!content) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Content not found' });
    }
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
