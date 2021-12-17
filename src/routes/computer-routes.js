// TODO: add middlewares to optimize code

const express = require('express');
const computerController = require('../controllers/computer-controller');
const authHandler = require('../middlewares/auth-handler');

const router = express.Router();

// protect all routes after this middleware
router.use(authHandler.authenticateUser);
router.get('/', computerController.getAllComputers);
router.get('/:id', computerController.getSingleComputer);
router.post('/:id/activate', computerController.activateComputer);
router.post('/:id/deactivate', computerController.deactivateComputer);
router.post('/:id/set-broken', computerController.setBrokenComputer);
router.post('/:computerID/order-food/:foodID', computerController.orderFood);
router.get('/:id/get-payment', computerController.getComputerPayment);
router.post('/:id/checkout', computerController.checkoutComputer);

// only admin can access the following routes
router.use(authHandler.authorizePermissions('admin'));
router.post('/', computerController.createComputer);
router
  .route('/:id')
  .patch(computerController.updateComputer)
  .delete(computerController.deleteComputer);

module.exports = router;
