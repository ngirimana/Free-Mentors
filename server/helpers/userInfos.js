import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import status from './StatusCode';

dotenv.config();
const getUserId = (res, token) => {
  try {
    const decoded = jwt.verify(token, 'process.env.SECRETEKEY');
    return decoded.id;
  } catch (error) {
    return res.status(status.BAD_REQUEST).send({ status: 400, error: error.message });
  }
};

export default getUserId;
