import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import status from '../helpers/StatusCode';

dotenv.config();
const mentor = (req, res, next) => {
  const token = req.header('x-auth-token');
  try {
    const decoded_jwt = jwt.verify(token, 'process.env.SECRETEKEY');
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
