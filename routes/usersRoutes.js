const express = require('express');
const {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  getCurrentUser,
} = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware'); // Your protect middleware
const roleCheck = require('../middlewares/roleMiddleware');

const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);

// POST /api/users/login
router.post('/login', loginUser);

// GET /api/users (Admin only)
router.get('/', protect, roleCheck('admin'), getAllUsers);

// GET /api/users/:id (Admin or the user themselves)
router.get('/me', protect, getCurrentUser);
router.get('/:id', getSingleUser);

// Protect routes and restrict to admin role for updating user role
router.patch('/:id/role', protect, roleCheck('admin'), updateUserRole);

// PUT /api/users/update-profile
router.put('/update-profile', protect, updateUserProfile);

// DELETE /api/users/delete-profile
router.delete('/delete-profile', protect, deleteUser);

module.exports = router;
