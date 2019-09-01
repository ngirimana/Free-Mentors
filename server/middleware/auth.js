import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user_model';
import status from '../helpers/StatusCode';

dotenv.config();

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  try {
    const decode_jwt = jwt.verify(token, 'process.env.SECRETEKEY');

    if (!User.isUserExist(decode_jwt.id)) {
      // eslint-disable-next-line max-len
      return res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'The User associated with this token doesn\'t exist.' });
    }
    next();
  } catch (error) {
    return res.status(status.BAD_REQUEST).send(
      { status: status.BAD_REQUEST, error: error.message },
    );
  }
};

export default auth;
