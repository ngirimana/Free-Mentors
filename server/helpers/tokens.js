import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const generateAuthToken = (id, mentor, admin) => {
  const token = jwt.sign({ id, is_mentor: mentor, is_admin: admin }, 'process.env.SECRETEKEY');
  return token;
};

export default generateAuthToken;
