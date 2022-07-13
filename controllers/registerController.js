import userModel from '../models/User.js';
import bcrypt from 'bcrypt';

const handleNewUser = async (req, res) => {
  // check if all fields are field or not
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'all fields are required' });
  }
  // check if user already exists in database
  const matchUser = await userModel.findOne({ username: req.body.username });
  if (matchUser) {
    return res.status(409).json({ message: 'user already exists.' });
  }

  // hash the password received from user
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  //save user to DB
  try {
    const newUser = await userModel.create({
      username: req.body.username,
      password: hashedPassword,
    });

    return res.status(201).json({ success: 'user registered successfully.' });
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

export default handleNewUser;
