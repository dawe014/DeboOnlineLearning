const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer storage
function createStorage(uploadType) {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = `uploads/${uploadType}`;
      // Check if directory exists, if not, create it
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath); // Folder to store images
    },
    filename: (req, file, cb) => {
      // Set the file name to the user ID and the original file extension
      cb(
        null,
        `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`,
      );
    },
  });
}

// Filter for allowed file types (image only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Only JPEG, PNG, or JPG files are allowed'), false);
  }
};

// Set up multer upload for profile pictures
const uploadProfilePicture = multer({
  storage: createStorage('profile_pictures'),
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size: 5MB
  },
});

// Set up multer upload for cover images
const uploadCoverImage = multer({
  storage: createStorage('cover_images'),
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size: 5MB
  },
});

module.exports = {
  uploadProfilePicture,
  uploadCoverImage,
};
