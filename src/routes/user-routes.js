const express = require('express');
const userController = require('../controllers/user-controller');
const authHandler = require('../middlewares/auth-handler');

const router = express.Router();

// protect all routes after this middleware
router.use(authHandler.authenticateUser);
router.get('/show-me', userController.showCurrentUser);

// TODO
router.patch('/update-my-password', userController.updateCurrentUserPassword);
router.patch('/update-me', userController.updateCurrentUser);

// only admin can access the following routes
router.use(authHandler.authorizePermissions('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getSingleUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
