const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workout.controller');

// Get all workouts for a user
router.get('/', workoutController.getUserWorkouts);

// Get a specific workout
router.get('/:id', workoutController.getWorkoutById);

// Generate a new workout plan
router.post('/generate', workoutController.generateWorkoutPlan);

// Create a new workout
router.post('/', workoutController.createWorkout);

// Update a workout
router.put('/:id', workoutController.updateWorkout);

// Delete a workout
router.delete('/:id', workoutController.deleteWorkout);

module.exports = router; 