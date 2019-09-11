import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import status from './StatusCode';

dotenv.config();
export const userId = (token, res) => {
  try {
    const decoded = jwt.verify(token, 'process.env.SECRETEKEY');
    return decoded.id;
  } catch (error) {
    return res.status(status.BAD_REQUEST).send({ status: 400, error: error.message });
  }
};
export const userEmail = (token, res) => {
  try {
    const decoded = jwt.verify(token, 'process.env.SECRETEKEY');
    return decoded.email;
  } catch (error) {
    return res.status(status.BAD_REQUEST).send({ status: 400, error: error.message });
  }
};
