import bcrypt from 'bcrypt';

const encryptPassword = (pswd) => bcrypt.hashSync(pswd, Number(process.env.PASSWORD_SALT));

export default encryptPassword;
