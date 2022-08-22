import userModel from '../models/User.js';

export const deleteAllUser = async (req, res) => {
  const response = userModel.deleteMany();
  return res.status(200).json({ message: 'User model cleared successfully' });
};

export const getSingleUser = async (req, res) => {
  const response = userModel.findOne();
  return res.status(200).json({ message: response.body });
};
