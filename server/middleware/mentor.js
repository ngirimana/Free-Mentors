
import dotenv from 'dotenv';
import status from '../helpers/StatusCode';
import verifyToken from '../helpers/verfyToken';
import response from '../helpers/response';

dotenv.config();

const mentor = (req, error, res, next) => {
  const decodedJwtMentor = verifyToken;
  if (!decodedJwtMentor) {
    return response.errorMessage(req, res, status.BAD_REQUEST, err.message);
  }
  if (!decodedJwtMentor.is_mentor) {
    return res.status(status.FORBIDDEN).send({ status: status.FORBIDDEN, error: 'You are not authorized to perform this action.' });
  }
  next();
};

export default mentor;
