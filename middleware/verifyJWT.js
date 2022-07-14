import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'unauthorized' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'forbidden' }); // invalid token
    console.log(decoded.username);
    next();
  });
};

export default verifyJWT;
