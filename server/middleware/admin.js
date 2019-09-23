
import dotenv from 'dotenv';
import status from '../helpers/StatusCode';
import verifyToken from '../helpers/verfyToken';

dotenv.config();

const admin = (req, res, err, next) => {
  const jwtAdmin = verifyToken;
  if (!jwtAdmin) {
    return res.status(status.BAD_REQUEST).send(
      { status: status.BAD_REQUEST, error: err.message },
    );
  }
  if (!jwtAdmin.is_admin) {
    return res.status(status.FORBIDDEN).send({ status: status.FORBIDDEN, error: 'You are not authorized to perform this action.' });
  }
  next();
};

export default admin;
