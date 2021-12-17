const express = require('express');
const foodController = require('../controllers/food-controller');
const authHandler = require('../middlewares/auth-handler');

const router = express.Router();

// protect all routes after this middleware
router.use(authHandler.authenticateUser);
router.get('/', foodController.getAllFoods);
router.get('/:id', foodController.getSingleFood);

// only admin can access the following routes
router.use(authHandler.authorizePermissions('admin'));
router.post('/', foodController.createFood);
router
  .route('/:id')
  .patch(foodController.updateFood)
  .delete(foodController.deleteFood);

module.exports = router;
