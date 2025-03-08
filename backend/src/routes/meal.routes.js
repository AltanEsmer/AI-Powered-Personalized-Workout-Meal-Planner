const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

// Protected routes - require authentication
router.get('/', authenticateToken, mealController.getUserMeals);
router.get('/:id', authenticateToken, mealController.getMealById);
router.post('/generate', authenticateToken, mealController.generateMealPlan);
router.post('/', authenticateToken, mealController.createMeal);
router.put('/:id', authenticateToken, mealController.updateMeal);
router.delete('/:id', authenticateToken, mealController.deleteMeal);

module.exports = router; 