import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import status from '../helpers/StatusCode';

dotenv.config();

const admin = (req, res, error, next) => {
  const token = req.header('x-auth-token');

  const decoded_jwt = jwt.verify(token, process.env.SECRETEKEY);
  if (!decoded_jwt) {
    return res.status(status.BAD_REQUEST).send(
      { status: status.BAD_REQUEST, error: error.message },
    );
  }
  if (!decoded_jwt.is_admin) {
    return res.status(status.FORBIDDEN).send({ status: status.FORBIDDEN, error: 'You are not authorized to perform this action.' });
  }
  next();
};

export default admin;
