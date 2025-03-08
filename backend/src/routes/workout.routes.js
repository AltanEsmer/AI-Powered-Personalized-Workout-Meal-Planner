const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Protected routes - require authentication
router.get('/', authenticateToken, workoutController.getUserWorkouts);
router.get('/:id', authenticateToken, workoutController.getWorkoutById);
router.post('/generate', authenticateToken, workoutController.generateWorkoutPlan);
router.post('/', authenticateToken, workoutController.createWorkout);
router.put('/:id', authenticateToken, workoutController.updateWorkout);
router.delete('/:id', authenticateToken, workoutController.deleteWorkout);

module.exports = router; 