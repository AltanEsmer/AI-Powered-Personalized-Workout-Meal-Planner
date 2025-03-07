const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Get user profile
router.get('/profile', userController.getUserProfile);

// Update user profile
router.put('/profile', userController.updateUserProfile);

// Get user preferences
router.get('/preferences', userController.getUserPreferences);

// Update user preferences
router.put('/preferences', userController.updateUserPreferences);

// Get user progress
router.get('/progress', userController.getUserProgress);

// Update user progress
router.post('/progress', userController.updateUserProgress);

module.exports = router; 