import jwt from 'jsonwebtoken';
import User from '../models/user_model';
import status from '../helpers/StatusCode';

const mentor = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) { return res.status(status.UNAUTHORIZED).send({ status: status.UNAUTHORIZED, error: 'Access denied. No token provided.' }); }

  try {
    const decoded_jwt = jwt.verify(token, 'secretKey');
    // Go ahead and grab user_id from JWT
    // and find if that id exists in our users[](later on would be)\
    // because we can not trust that user still exists
    if (!User.isUserExist(decoded_jwt.id)) {
      return res.status(status.NOT_FOUND).send({ tatus: status.NOT_FOUND, error: 'The User associated with this token doesn\'t exist.' });
    }

    // check again if user is mentor to be allowed to perform
    // [change user to accept or reject mentorship session request]
    if (!decoded_jwt.is_mentor) {
      return res.status(status.FORBIDDEN).send({ status: status.FORBIDDEN, error: 'You are not authorized to perform this action.' });
    }
    next();
  } catch (error) {
    return res.status(status.BAD_REQUEST).send(
      { status: status.BAD_REQUEST, error: error.message },
    );
  }
};
export default mentor;
