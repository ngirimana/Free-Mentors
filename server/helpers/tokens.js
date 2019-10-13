import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const Helper = {

  generateAuthToken(id, userEmail, mentor, admin) {
    const token = jwt.sign({
      Id: id,
      email: userEmail,
      is_mentor: mentor,
      is_admin: admin,
    },
    process.env.SECRETEKEY, { expiresIn: '1d' });
    return token;
  },

  verifyToken(token) {
    const mytoken = jwt.verify(token, process.env.SECRETEKEY);
    return mytoken.Id;
  },
  verifyadmin(token) {
    const mytoken = jwt.verify(token, process.env.SECRETEKEY);
    return mytoken.is_admin;
  },
  verifymentor(userToken) {
    const yourtoken = jwt.verify(userToken, process.env.SECRETEKEY);
    return yourtoken.is_mentor;
  },
  userInfosEmail(token) {
    const mytoken = jwt.verify(token, process.env.SECRETEKEY);
    return mytoken.email;
  },
};

export default Helper;
