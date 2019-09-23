import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import status from '../helpers/StatusCode';

dotenv.config();

const mentor = (req, error, res, next) => {
  const token = req.header('x-auth-token');

  const decodedJwtMentor = jwt.verify(token, process.env.SECRETEKEY);
  if (!decodedJwtMentor) {
    return res.status(status.BAD_REQUEST).send(
      { status: status.BAD_REQUEST, error: error.message },
    );
  }
  if (!decodedJwtMentor.is_mentor) {
    return res.status(status.FORBIDDEN).send({ status: status.FORBIDDEN, error: 'You are not authorized to perform this action.' });
  }
  next();
};

export default mentor;
