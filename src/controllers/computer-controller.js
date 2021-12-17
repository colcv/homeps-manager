// TODO: document all controllers
// TODO: remove duplicate code

const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');
const Computer = require('../models/computer-model');
const Food = require('../models/food-model');
const Payment = require('../models/payment-model');

const createComputer = async (req, res) => {
  const numID = +req.body.numID;
  let computer;
  if (numID) {
    computer = await Computer.create({ numID });
  } else if (!numID) {
    const lastComputers = await Computer.find().sort('-numID');
    if (lastComputers.length === 0) {
      computer = await Computer.create({ numID: 1 });
    } else {
      computer = await Computer.create({ numID: lastComputers[0].numID + 1 });
    }
  }
  res.status(StatusCodes.CREATED).json({ status: 'success', computer });
};

const getAllComputers = async (req, res) => {
  const computers = await Computer.find();
  res
    .status(StatusCodes.OK)
    .json({ status: 'success', results: computers.length, computers });
};

const getSingleComputer = async (req, res) => {
  const { id: computerID } = req.params;
  let computer;
  if (computerID.length <= 3) {
    computer = await Computer.findOne({ numID: computerID });
  } else {
    computer = await Computer.findById(computerID);
  }
  if (!computer) {
    throw new customError.NotFoundError(`No computer with ID: ${computerID}`);
  }
  res.status(StatusCodes.OK).json({ status: 'success', computer });
};

const updateComputer = async (req, res) => {
  const { id: computerID } = req.params;
  let computer;
  if (computerID.length <= 3) {
    computer = await Computer.findOneAndUpdate(
      { numID: computerID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    computer = await Computer.findByIdAndUpdate(computerID, req.body, {
      new: true,
      runValidators: true,
    });
  }
  if (!computer) {
    throw new customError.NotFoundError(`No computer with ID: ${computerID}`);
  }
  res.status(StatusCodes.OK).json({ status: 'success', computer });
};

const deleteComputer = async (req, res) => {
  const { id: computerID } = req.params;
  let computer;
  if (computerID.length <= 3) {
    computer = await Computer.findOne({ numID: computerID });
  } else {
    computer = await Computer.findById(computerID);
  }
  if (!computer) {
    throw new customError.NotFoundError(`No computer with ID: ${computerID}`);
  }
  computer.remove();
  res
    .status(StatusCodes.OK)
    .json({ status: 'success', message: 'Computer deleted' });
};

const activateComputer = async (req, res) => {
  const { id: computerID } = req.params;
  let computer;
  if (computerID.length <= 3) {
    computer = await Computer.findOne({ numID: computerID });
  } else {
    computer = await Computer.findById(computerID);
  }
  if (!computer) {
    throw new customError.NotFoundError(`No computer with ID: ${computerID}`);
  }
  if (computer.status === 'active') {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ status: 'fail', message: 'Computer already activated' });
  }
  if (computer.status === 'broken') {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ status: 'fail', message: 'Computer broken, cannot activate' });
  }

  computer.status = 'active';
  computer.activatedAt = Date.now();
  computer.save();
  res
    .status(StatusCodes.OK)
    .json({ status: 'success', message: 'Computer activated' });
};

const deactivateComputer = async (req, res) => {
  const { id: computerID } = req.params;
  let computer;
  if (computerID.length <= 3) {
    computer = await Computer.findOne({ numID: computerID });
  } else {
    computer = await Computer.findById(computerID);
  }
  if (!computer) {
    throw new customError.NotFoundError(`No computer with ID: ${computerID}`);
  }
  if (computer.status === 'inactive') {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ status: 'fail', message: 'Computer already inactive' });
  }

  computer.status = 'inactive';
  computer.activatedAt = undefined;
  computer.save();
  res
    .status(StatusCodes.OK)
    .json({ status: 'success', message: 'Computer deactivated' });
};

const setBrokenComputer = async (req, res) => {
  const { id: computerID } = req.params;
  let computer;
  if (computerID.length <= 3) {
    computer = await Computer.findOne({ numID: computerID });
  } else {
    computer = await Computer.findById(computerID);
  }
  if (!computer) {
    throw new customError.NotFoundError(`No computer with ID: ${computerID}`);
  }
  if (computer.status === 'broken') {
    return res
      .status(StatusCodes.CONFLICT)
      .json({ status: 'fail', message: 'Computer already broken' });
  }

  computer.status = 'broken';
  computer.activatedAt = undefined;
  computer.save();
  res
    .status(StatusCodes.OK)
    .json({ status: 'success', message: 'Computer set broken' });
};

const orderFood = async (req, res) => {
  const { computerID, foodID } = req.params;
  let computer;
  if (computerID.length <= 3) {
    computer = await Computer.findOne({ numID: computerID });
  } else {
    computer = await Computer.findById(computerID);
  }
  if (!computer) {
    throw new customError.NotFoundError(`No computer with ID: ${computerID}`);
  }
  if (computer.status !== 'active') {
    throw new customError.BadRequestError(
      'Computer not activated, cannot order food'
    );
  }
  const food = await Food.findById(foodID);
  if (!food) {
    throw new customError.NotFoundError(`No food with ID: ${foodID}`);
  }

  computer.orderingFood.push(foodID);
  computer.save();
  res
    .status(StatusCodes.OK)
    .json({ status: 'success', message: `Successfully ordered ${food.name}` });
};

const getComputerPayment = async (req, res) => {
  const { id: computerID } = req.params;
  let computer;
  if (computerID.length <= 3) {
    computer = await Computer.findOne({ numID: computerID }).populate(
      'orderingFood'
    );
  } else {
    computer = await Computer.findById(computerID).populate('orderingFood');
  }
  if (!computer) {
    throw new customError.NotFoundError(`No computer with ID: ${computerID}`);
  }
  if (computer.status !== 'active') {
    throw new customError.BadRequestError(
      'Computer not activated, cannot get payment amount'
    );
  }
  const activatedTime = +(
    (Date.now() - computer.activatedAt) /
    (1000 * 60 * 60)
  ).toFixed(1); // hours
  const computerAmount = activatedTime * 5000; // VND

  const foodAmount = computer.orderingFood.reduce(
    (totalFoodAmount, food) => totalFoodAmount + food.price,
    0
  );

  const totalAmount = foodAmount + computerAmount;

  res.status(StatusCodes.OK).json({
    status: 'success',
    activatedTime,
    foodAmount,
    computerAmount,
    totalAmount,
  });
};

const checkoutComputer = async (req, res) => {
  const { id: computerID } = req.params;
  let computer;
  if (computerID.length <= 3) {
    computer = await Computer.findOne({ numID: computerID }).populate(
      'orderingFood'
    );
  } else {
    computer = await Computer.findById(computerID).populate('orderingFood');
  }
  if (!computer) {
    throw new customError.NotFoundError(`No computer with ID: ${computerID}`);
  }
  if (computer.status !== 'active') {
    throw new customError.BadRequestError(
      'Computer not activated, cannot checkout'
    );
  }

  const activatedTime = +(
    (Date.now() - computer.activatedAt) /
    (1000 * 60 * 60)
  ).toFixed(1); // hours
  const computerAmount = activatedTime * 5000; // VND

  const foodAmount = computer.orderingFood.reduce(
    (totalFoodAmount, food) => totalFoodAmount + food.price,
    0
  );

  const totalAmount = foodAmount + computerAmount;

  const payment = await Payment.create({
    computerID: computer.numID,
    computerAmount,
    foodAmount,
    totalAmount,
    activatedTime,
  });

  computer.status = 'inactive';
  computer.activatedAt = undefined;
  computer.orderingFood = [];
  computer.save();

  res.status(StatusCodes.OK).json({ status: 'success', payment });
};

module.exports = {
  createComputer,
  getAllComputers,
  getSingleComputer,
  updateComputer,
  deleteComputer,
  activateComputer,
  deactivateComputer,
  orderFood,
  setBrokenComputer,
  getComputerPayment,
  checkoutComputer,
};
