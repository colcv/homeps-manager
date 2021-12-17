const { StatusCodes } = require('http-status-codes');
const User = require('../models/user-model');
const customError = require('../errors');

/**
 * Create a user account.
 * Only Admin can access this route.
 * @route POST /api/v1/users
 * @access protected
 */
const createUser = async (req, res) => {
  // simple check for valid input
  const { name, email, password, passwordConfirm } = req.body;
  if (!name || !email || !password) {
    throw new customError.BadRequestError(
      "Please provide user's name, email and password"
    );
  } else if (!passwordConfirm) {
    throw new customError.BadRequestError("Please confirm user's password");
  }

  // check for password confirmation
  if (passwordConfirm !== password) {
    throw new customError.BadRequestError(
      'Password confirmation does not match, try again.'
    );
  }

  // create new user account
  const user = await User.create({ name, email, password, role: 'user' });

  // response
  user.password = undefined;
  res.status(StatusCodes.CREATED).json({ status: 'success', user });
};

/**
 * Get all users except Admin.
 * Only Admin can access this route.
 * @route GET /api/v1/users
 * @access protected
 */
const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res
    .status(StatusCodes.OK)
    .json({ status: 'success', results: users.length, users });
};

/**
 * Get a single user except Admin.
 * Only Admin can access this route.
 * @route GET /api/v1/users/:id
 * @access protected
 */
const getSingleUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findOne({ _id: userID, role: 'user' }).select(
    '-password'
  );
  if (!user) {
    throw new customError.NotFoundError(`No user with ID: ${userID}`);
  }
  res.status(StatusCodes.OK).json({ status: 'success', user });
};

/**
 * Update user information (user's password can be updated through this route).
 * Only Admin can access this route.
 * @route PATCH /api/v1/users/:id
 * @access protected
 */
const updateUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findById(userID);
  if (!user) {
    throw new customError.NotFoundError(`No user with ID: ${userID}`);
  }

  const allowedFields = ['name', 'email', 'password', 'role'];
  Object.keys(req.body).forEach((field) => {
    if (allowedFields.includes(field)) {
      user[field] = req.body[field];
    }
  });
  await user.save(); // use save() to trigger middleware in mongoose

  user.password = undefined;
  res.status(StatusCodes.OK).json({ status: 'success', user });
};

/**
 * Delete a user account.
 * Only Admin can access this route.
 * @route DELETE /api/v1/users/:id
 * @access protected
 */
const deleteUser = async (req, res) => {
  const { id: userID } = req.params;
  const user = await User.findById(userID);
  if (!user) {
    throw new customError.NotFoundError(`No user with ID: ${userID}`);
  } else if (user.role === 'admin') {
    throw new customError.BadRequestError("You can't delete an Admin account");
  }

  await User.findByIdAndDelete(userID);
  res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'User deleted',
  });
};

/**
 * Show current user's information
 * @route GET /api/v1/users/showMe
 * @access protected
 */
const showCurrentUser = async (req, res) => {
  const { userID } = req.user;
  const user = await User.findById(userID).select('-password');
  res.status(StatusCodes.OK).json({ status: 'success', user });
};

/**
 * Change password of current user
 * @route PATCH /api/v1/users/updateMyPassword
 * @access protected
 * @todo
 */
const updateCurrentUserPassword = async (req, res) => {
  res.send('update my password');
};

/**
 * Update current user's information
 * @route PATCH /api/v1/users/updateMe
 * @access protected
 * @todo
 */
const updateCurrentUser = async (req, res) => {
  res.send('update current user');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  showCurrentUser,
  updateCurrentUserPassword,
  updateCurrentUser,
};
