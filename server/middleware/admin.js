
import dotenv from 'dotenv';
import status from '../helpers/StatusCode';
import verifyToken from '../helpers/verfyToken';
import response from '../helpers/response';

dotenv.config();

const admin = (req, res, err, next) => {
  const jwtAdmin = verifyToken;
  if (!jwtAdmin) {
    return response.errorMessage(req, res, status.BAD_REQUEST, err.message);
  }
  if (!jwtAdmin.is_admin) {
    return res.status(status.FORBIDDEN).send({ status: status.FORBIDDEN, error: 'You are not authorized to perform this action.' });
  }
  next();
};

export default admin;
