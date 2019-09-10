
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Model from '../models/queries';
import status from '../helpers/StatusCode';

dotenv.config();
const model = new Model('users');
const auth = async (req, res, next) => {
  try {
    const token = req.header('x-auth-token');
    if (!token) return res.status(status.UNAUTHORIZED).send({ status: status.UNAUTHORIZED, error: 'Access denied. No token provided' });
    const decoded_jwt = jwt.verify(token, 'process.env.SECRETEKEY');

    const user = await model.select('*', 'id=$1', [decoded_jwt.id]);
    if (!user.length) {
      return res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'The User associated with this token doesn\'t exist.' });
    }
    next();
  } catch (error) {
    return res.status(status.BAD_REQUEST).send(
      { status: status.BAD_REQUEST, error: error.message },
    );
  }
};

export default { auth };
