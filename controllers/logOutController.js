import userModel from '../models/User.js';
import 'dotenv/config';

const handleLogOut = async (req, res) => {
  // clear cookies
  const cookies = req.cookies;
  // check whether cookies exists or not
  if (!cookies.jwt) {
    return res.status(204).json({ message: 'no cookies' }); // no content
  }

  // check whether refreshToken exists in DB
  const matchUser = userModel.findOne({ refreshToken: refreshToken });
  // if (!foundUser){
  // // res.cl

  // }
};

export default handleLogOut;
