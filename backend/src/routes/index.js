const express = require('express');
const router = express.Router();

// Import route modules
const workoutRoutes = require('./workout.routes');
const mealRoutes = require('./meal.routes');
const userRoutes = require('./user.routes');

// Register routes
router.use('/workouts', workoutRoutes);
router.use('/meals', mealRoutes);
router.use('/users', userRoutes);

module.exports = router; 