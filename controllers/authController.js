import userModel from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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
    //Access Token
    const accessToken = jwt.sign(
      { username: matchUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    //Refresh
    const refreshToken = jwt.sign(
      { username: matchUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    );
    //save refresh token in httpOnly cookies
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    //save refresh token in database
    matchUser.refreshToken = refreshToken;
    await matchUser.save();

    return res.status(200).json({
      message: 'user logged in successfully',
      accessToken: accessToken,
    });
  } else {
    return res.status(401).json({ message: 'invalid credientials' });
  }
};



export default handleLogin;
