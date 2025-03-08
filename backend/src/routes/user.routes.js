const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Protected routes - require authentication
router.get('/profile', authenticateToken, userController.getUserProfile);
router.put('/profile', authenticateToken, userController.updateUserProfile);
router.get('/preferences', authenticateToken, userController.getUserPreferences);
router.put('/preferences', authenticateToken, userController.updateUserPreferences);
router.get('/progress', authenticateToken, userController.getUserProgress);
router.post('/progress', authenticateToken, userController.updateUserProgress);

module.exports = router; 