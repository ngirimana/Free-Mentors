import jwt from 'jsonwebtoken';
import status from './StatusCode';

const getUserId = (res, token) => {
  // decode token for the sake of picking user_id
  // to use in setting trip owner.
  try {
    const decoded = jwt.verify(token, 'secretKey');
    return decoded.id;
  } catch (error) {
    return res.status(status.BAD_REQUEST).send({ status: 400, error: error.message });
  }
};

export default getUserId;
