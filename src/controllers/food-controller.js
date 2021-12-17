// TODO: document all controllers

const { StatusCodes } = require('http-status-codes');
const Food = require('../models/food-model');
const customError = require('../errors');

const createFood = async (req, res) => {
  const food = await Food.create(req.body);
  res.status(StatusCodes.OK).json({ status: 'success', food });
};

const getAllFoods = async (req, res) => {
  const foods = await Food.find();
  res
    .status(StatusCodes.OK)
    .json({ status: 'success', results: foods.length, foods });
};

const getSingleFood = async (req, res) => {
  const { id: foodID } = req.params;
  const food = await Food.findById(foodID);
  if (!food) {
    throw new customError.NotFoundError(`No food with ID: ${foodID}`);
  }
  res.status(StatusCodes.OK).json({ status: 'success', food });
};

const updateFood = async (req, res) => {
  const { id: foodID } = req.params;
  const food = await Food.findByIdAndUpdate(foodID, req.body, {
    new: true,
    runValidators: true,
  });
  if (!food) {
    throw new customError.NotFoundError(`No food with ID: ${foodID}`);
  }
  res.status(StatusCodes.OK).json({ status: 'success', food });
};

const deleteFood = async (req, res) => {
  const { id: foodID } = req.params;
  const food = await Food.findById(foodID);
  if (!food) {
    throw new customError.NotFoundError(`No food with ID: ${foodID}`);
  }
  food.remove();
  res
    .status(StatusCodes.OK)
    .json({ status: 'success', message: 'Food deleted' });
};

module.exports = {
  createFood,
  getAllFoods,
  getSingleFood,
  updateFood,
  deleteFood,
};
