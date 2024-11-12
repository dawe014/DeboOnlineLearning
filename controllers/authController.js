const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Check if passwords match
    // if (password !== confirmPassword) {
    //   return res.status(400).json({ message: 'Passwords do not match' });
    // }
    const newUser = await User.create({ name, email, password });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({
      success: true,
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email, including the password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate the token including user ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Use user.role for the role
      process.env.JWT_SECRET, // Secret key
      { expiresIn: process.env.JWT_EXPIRES_IN }, // Options
    );

    // Send response with the token
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords for security
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a single user (Admin or User themselves)
exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // Exclude password for security

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCurrentUser = async (req, res) => {
  try {
    // Assuming req.user is populated by your authentication middleware
    const user = await User.findById(req.user.id).select('-password'); // Exclude password for security

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update name and email if provided
    if (name) user.name = name;
    if (email) user.email = email;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Update password if provided
    if (password) {
      user.password = await bcrypt.hash(password, 12);
    }

    await user.save();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { role } = req.body; // Extract role from request body
    const user = await User.findById(req.params.id); // Get user by ID from request parameters

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update role if provided
    if (role) {
      user.role = role; // Ensure you validate the role as per your application logic
    } else {
      return res.status(400).json({ message: 'Role must be provided' });
    }

    await user.save();
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete User Profile
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.remove();
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
