const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const router = express.Router();

// Set up storage for uploaded PDFs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure this folder exists!
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter to only allow PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
  // No file size limit
});

// POST /api/upload - Protected route
router.post('/', auth, upload.single('pdf'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Log file size and original name for debugging
    console.log('File uploaded successfully:', req.file.filename, 'Size:', req.file.size, 'Original name:', req.file.originalname);
    
    // Respond with the file path or name
    res.json({ 
      success: true,
      filePath: `/uploads/${req.file.filename}`, 
      fileName: req.file.filename,
      message: 'File uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 10MB.' });
    }
  }
  if (error.message === 'Only PDF files are allowed!') {
    return res.status(400).json({ message: error.message });
  }
  res.status(500).json({ message: 'Upload failed', error: error.message });
});

module.exports = router; 