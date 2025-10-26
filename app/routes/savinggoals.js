const express = require('express');
const router = express.Router();

module.exports = function(savingGoalController) {
  // Create a new saving goal
  router.post('/', (req, res) => savingGoalController.createGoal(req, res));

  // Get all goals for the logged-in user
  router.get('/', (req, res) => savingGoalController.getAllGoals(req, res));

  // Get a specific goal
  router.get('/:id', (req, res) => savingGoalController.getGoalById(req, res));

  // Update a goal
  router.put('/:id', (req, res) => savingGoalController.updateGoal(req, res));

  // Add funds to a goal
  router.post('/:id/add-funds', (req, res) => savingGoalController.addFunds(req, res));

  // Delete a goal
  router.delete('/:id', (req, res) => savingGoalController.deleteGoal(req, res));

  return router;
};
