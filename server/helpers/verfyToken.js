import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const verifyUserToken = (req) => {
  const userToken = req.header('x-auth-token');

  return jwt.verify(userToken, process.env.SECRETEKEY);
};

export default verifyUserToken;
