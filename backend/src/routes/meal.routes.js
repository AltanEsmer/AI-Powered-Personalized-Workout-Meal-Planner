const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');

// Get all meals for a user
router.get('/', mealController.getUserMeals);

// Get a specific meal
router.get('/:id', mealController.getMealById);

// Generate a new meal plan
router.post('/generate', mealController.generateMealPlan);

// Create a new meal
router.post('/', mealController.createMeal);

// Update a meal
router.put('/:id', mealController.updateMeal);

// Delete a meal
router.delete('/:id', mealController.deleteMeal);

module.exports = router; 