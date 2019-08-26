import jwt from 'jsonwebtoken';
import User from '../models/user_model';
import status from '../helpers/StatusCode';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(status.UNAUTHORIZED).send({ status: status.UNAUTHORIZED, error: ' Access denied no token provided ' });

  try {
    const decode_jwt = jwt.verify(token, 'secretKey');
    // Go ahead and grab user_id from JWT
    // and find if that id exists in our users[](later on would be)
    // because we can not trust that user still exists
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
