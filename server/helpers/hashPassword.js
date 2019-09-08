import bcrypt from 'bcrypt';

const encryptPassword = async (pswd) => bcrypt.hashSync(pswd, Number(process.env.PASSWORD_SALT));
const decryptPassword = (userPswd, hashedPswd) => bcrypt.compareSync(userPswd, hashedPswd);
export default {
  encryptPassword,
  decryptPassword,
};
