import userModel from '../models/User.js';
import 'dotenv/config';

const handleLogOut = async (req, res) => {
  // clear cookies
  const cookies = req.cookies;
  // check whether cookies exists or not
  if (!cookies.jwt) {
    return res.sendStatus(204).json({ message: 'no cookies' }); // no content
  }

  const refreshToken = cookies.jwt;

  // check whether refreshToken exists in DB
  const matchUser = await userModel.findOne({ refreshToken: refreshToken });
  if (!matchUser) {
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in DB
  matchUser.refreshToken = '';
  await matchUser.save();
  res.clearCookie('jwt', { httpOnly: true });
  return res.sendStatus(204);
};

export default handleLogOut;
