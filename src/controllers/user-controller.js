const createUser = async (req, res) => {
  res.send('create user');
};

const getAllUsers = async (req, res) => {
  res.send('get all users');
};

const getSingleUser = async (req, res) => {
  res.send('get single user');
};

const updateUser = async (req, res) => {
  res.send('update user');
};

const deleteUser = async (req, res) => {
  res.send('delete user');
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
};
