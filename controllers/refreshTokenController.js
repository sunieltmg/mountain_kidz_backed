import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userModel from '../models/User.js';

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  // check whether cookies exists or not
  if (!cookies.jwt) {
    return res.status(401).json({ message: 'unauthorized' });
  }
  const refreshToken = cookies.jwt;
  // match refreshToken in database
  const matchUser = await userModel.findOne({ refreshToken: refreshToken });
  if (!matchUser) {
    return res.status(403).json({ message: 'forbidden' });
  }

  // verify refreshToken
  const matchRefreshToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || matchUser.username !== decoded.username) {
        return res.status(403).json({ message: 'forbidden d' });
      }
      // create new accessToken
      const accessToken = jwt.sign(
        { username: decoded.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '50s' }
      );

      return res.status(200).json({ accessToken: accessToken });
    }
  );
};

export default handleRefreshToken;
