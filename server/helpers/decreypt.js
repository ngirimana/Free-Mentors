import bcrypt from 'bcrypt';

const decryptPassword = (userPswd, hashedPswd) => bcrypt.compareSync(userPswd, hashedPswd);

export default decryptPassword;
