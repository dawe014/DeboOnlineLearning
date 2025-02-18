const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Enrollment must be for a specific course'],
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Enrollment must have a student'],
  },
  tx_ref: {
    type: String,
    default: null,
  },
  enrolledAt: {
    type: Date,
    default: Date.now,
  },
  certified: {
    type: Boolean,
    default: false,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
