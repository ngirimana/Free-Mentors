
import dotenv from 'dotenv';
import status from '../helpers/StatusCode';
import verifyToken from '../helpers/verfyToken';

dotenv.config();

const mentor = (req, error, res, next) => {
  const decodedJwtMentor = verifyToken;
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
