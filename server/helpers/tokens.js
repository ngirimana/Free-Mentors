import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const generateAuthToken = (id, admin, mentor) => {
  const token = jwt.sign({ id, is_admin: admin, is_mentor: mentor }, 'process.env.SECRETEKEY');
  return token;
};

export default generateAuthToken;
