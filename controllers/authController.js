import userModel from '../models/User.js';
import bcrypt from 'bcrypt';

const handleLogin = async (req, res) => {
  // check if all fields are field
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'all fields are required' });
  }

  // check if user exists inside database
  const matchUser = await userModel.findOne({ username: req.body.username });
  if (!matchUser) {
    return res.status(401).json({ message: 'user does not exists.' });
  }

  //evaluate password
  const matchPassword = await bcrypt.compare(
    req.body.password,
    matchUser.password
  );
  if (matchPassword) {
    //create JWT token
    return res.status(200).json({ message: 'user logged in successfully' });
  } else {
    return res.status(401).json({ message: 'invalid credientials' });
  }
};

export default handleLogin;
