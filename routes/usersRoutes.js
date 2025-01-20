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
  updateProfile,
  getAllStudents,
  getAllInstructors,
  registerInstructor,
} = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware'); // Your protect middleware
const roleCheck = require('../middlewares/roleMiddleware');
const { uploadProfilePicture } = require('../utils/multer');
// const upload = require('../utils/multer');

const router = express.Router();

// POST /api/users/register
router.post('/register', registerUser);
router.post(
  '/registerInstructor',
  protect,
  roleCheck('admin'),
  registerInstructor,
);

// POST /api/users/login
router.post('/login', loginUser);

// GET /api/users (Admin only)
router.get('/', protect, roleCheck('admin'), getAllUsers);
router.get('/students', protect, roleCheck('admin'), getAllStudents);
router.get('/instructors', protect, roleCheck('admin'), getAllInstructors);

// GET /api/users/:id (Admin or the user themselves)
router.get('/me', protect, getCurrentUser);
router.get('/:id', getSingleUser);

// Protect routes and restrict to admin role for updating user role
router.patch('/:id/role', protect, roleCheck('admin'), updateUserRole);

// PUT /api/users/update-profile
router.put('/update-profile', protect, updateUserProfile);

router.put(
  '/update-my-profile',
  protect,
  uploadProfilePicture.single('profilePicture'),
  updateProfile,
);

// DELETE /api/users/delete-user/:id
router.delete('/delete-user/:id', protect, deleteUser);

module.exports = router;
