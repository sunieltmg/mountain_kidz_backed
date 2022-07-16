import redis from 'redis';
import { getAsync } from '../index.js';

const cacheAllCourse = async (req, res, next) => {
  const allCourse = await getAsync('allCourse');
  if (allCourse) {
    res.status(200).json({ data: allCourse });
  } else {
    next();
  }
};

export default cacheAllCourse;
