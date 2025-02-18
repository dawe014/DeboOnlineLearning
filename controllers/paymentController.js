const dotenv = require('dotenv');
const axios = require('axios'); // No need for destructuring here
const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/Course');
const User = require('../models/User');

dotenv.config({ path: './config.env' });

const apiKey = process.env.CHAPA_AUTH_KEY;

// Enroll a student in a course
exports.acceptPayment = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user.id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Course not found' });
    }
    const user = await User.findById(studentId);

    const formattedName = user.name.replace(/\s+/g, '-');
    const txRef = `${formattedName}-${Date.now()}`; // Check if the student is already paid (i.e., tx_ref is not null)
    const enrollment = await Enrollment.findOne({
      course: courseId,
      student: studentId,
    });

    if (enrollment && enrollment.tx_ref) {
      return res.status(400).json({
        status: 'fail',
        message: 'Student has already paid for this course',
      });
    }

    // Prepare the payment request
    const header = {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    };

    const data = {
      amount: 12, // Use the course's price
      currency: 'ETB',
      email: user.email,
      first_name: user.name,
      phone_number: `0918344686`,
      tx_ref: txRef,
      return_url: 'http://localhost:5173/dashboard/mycourse',
    };
    // Initialize the payment
    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      data,
      header,
    );
    // Update the enrollment with tx_ref if not already done
    if (response.data.status === 'success') {
      enrollment.tx_ref = txRef; // Update existing enrollment
      await enrollment.save();
    }

    // Send the response with payment details
    res.status(200).json({
      status: 'success',
      data: {
        paymentLink: response.data.data.checkout_url, // Assuming this is where the payment link is
      },
    });
  } catch (err) {
    console.log(err.response); // Log the error for debugging
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.user.id;

    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (!enrollment) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Enrollment not found' });
    }

    const txRef = enrollment.tx_ref;
    if (txRef === null) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'You have not payed for the course' });
    }

    res.status(200).json({
      status: 'success',
      data: { data: txRef },
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
