import lodash from 'lodash';
import dotenv from 'dotenv';
import encryptPassword from '../helpers/hashPassword';
import decryptPassword from '../helpers/decreypt';
import Model from '../models/queries';
import generateAuthToken from '../helpers/tokens';
import status from '../helpers/StatusCode';
import response from '../helpers/response';

dotenv.config();
class UserController {
  static model() {
    return new Model('users');
  }

  static signUp = async (req, res) => {
    try {
      let {
        first_name,
        last_name,
        email,
        password,
        address,
        bio,
        occupation,
        expertise,
        is_mentor,
        is_admin,
      } = req.body;

      is_mentor = false;
      is_admin = false;
      const user = await this.model().select('*', 'email=$1', [email]) || [];
      if (user[0]) {
        return response.errorMessage(req, res, status.REQUEST_CONFLICT, `${email} is already taken!`);
      }

      password = await encryptPassword(password);
      const columns = 'first_name, last_name, email, password, address, bio, occupation, expertise, is_mentor, is_admin';
      const dataa = `'${first_name}', '${last_name}', '${email}', '${password}','${address}','${bio}','${occupation}','${expertise}',${is_mentor},${is_admin}`;
      const rows = await this.model().insert(columns, dataa) || [];
      if (rows.length) {
        let token = generateAuthToken(rows[0].id, rows[0].email,
          rows[0].is_mentor, rows[0].is_admin);
        const data = {
          token,
          userData: lodash.pick(rows[0], 'id', 'first_name', 'last_name', 'email', 'address', 'bio', 'occupation', 'expertise', 'is_mentor', 'is_admin'),
        };
        return response.successMessage(req, res, status.RESOURCE_CREATED, 'user created succefully', data);
      }
    } catch (error) {
      return response.errorMessage(req, res, status.SERVER_ERROR, error.message);
    }
  }


  static signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const login = await this.model().select('*', 'email=$1', [email]);
      if (login[0] && (decryptPassword(password, login[0].password))) {
        let token = generateAuthToken(login[0].id, login[0].email,
          login[0].is_mentor, login[0].is_admin);
        const data = {
          token,
          userData: lodash.pick(login[0], 'id', 'first_name', 'last_name', 'email', 'address', 'bio', 'occupation', 'expertise', 'is_mentor', 'is_admin'),
        };
        return response.successMessage(req, res, status.REQUEST_SUCCEEDED, 'user created succefully', data);
      }
      return response.errorMessage(req, res, status.UNAUTHORIZED, 'Invalid Email or Password');
    } catch (err) {
      return response.errorMessage(req, res, status.SERVER_ERROR, err.message);
    }
  }
}
export default UserController;
