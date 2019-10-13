import lodash from 'lodash';
import dotenv from 'dotenv';
import encryptPassword from '../helpers/hashPassword';
import decryptPassword from '../helpers/decreypt';
import Model from '../models/queries';
import Token from '../helpers/tokens';
import status from '../helpers/StatusCode';
import response from '../helpers/response';

dotenv.config();
class UserController {
  static model() {
    return new Model('users');
  }

  static signUp = async (req, res) => {
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
    if (user.length) {
      return response.errorMessage(req, res, status.REQUEST_CONFLICT, `${email} is already taken!`);
    }

    password = await encryptPassword(password);
    const columns = 'first_name, last_name, email, password, address, bio, occupation, expertise, is_mentor, is_admin';
    const dataa = `'${first_name}', '${last_name}', '${email}', '${password}','${address}','${bio}','${occupation}','${expertise}',${is_mentor},${is_admin}`;
    const rows = await this.model().insert(columns, dataa) || [];
    if (rows.length) {
      let token = Token.generateAuthToken(rows[0].id, rows[0].email,
        rows[0].is_mentor, rows[0].is_admin);
      const data = {
        token,
        userData: lodash.pick(rows[0], 'id', 'first_name', 'last_name', 'email', 'address', 'bio', 'occupation', 'expertise', 'is_mentor', 'is_admin'),
      };
      return response.successMessage(req, res, status.RESOURCE_CREATED, 'user created succefully', data);
    }
  }


  static signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const login = await this.model().select('*', 'email=$1', [email]);
      if (login[0] && (decryptPassword(password, login[0].password))) {
        let token = Token.generateAuthToken(login[0].id, login[0].email,
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

  static changeToMentor = async (req, res) => {
    try {
      const { id } = req.params;
      if (isNaN(id.trim())) {
        return response.errorMessage(req, res, status.BAD_REQUEST, 'User id should be an integer');
      }
      const user = await this.model().select('*', 'id=$1', [id]);
      if (user.length === 0) {
        return response.errorMessage(req, res, status.NOT_FOUND, 'The user with  id is not found!.');
      }

      if (user[0].is_mentor === true) {
        return response.errorMessage(req, res, status.REQUEST_CONFLICT, 'The user with this id is already a mentor!.');
      }
      const rows = await this.model().update('is_mentor=$1', 'id=$2', [true, id]);
      if (rows) {
        return response.successMessage(req, res, status.REQUEST_SUCCEEDED, 'User account changed to mentor', rows);
      }
    } catch (e) {
      return response.errorMessage(req, res, e);
    }
  }

  static getAllMentors = async (req, res) => {
    const mentors = [];
    const isMentor = true;
    const mentor = await this.model().select('*', 'is_mentor=$1', [isMentor]);
    for (let item = 0; item < mentor.length; item += 1) {
      mentors.push(lodash.pick(mentor[item],
        ['id', 'first_Name', 'last_name', 'email',
          'address', 'bio', 'occupation', 'expertise', 'is_mentor', 'is_admin']));
    }
    if (mentors.length <= 0) {
      return response.errorMessage(req, res, status.NOT_FOUND, 'Mentors are not available');
    }
    const data = {
      mentors,
    };
    return response.successMessage(req, res, status.REQUEST_SUCCEEDED, 'Mentors are available:', data);
  }

  static getSpecificMentor = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id.trim())) {
      return response.errorMessage(req, res, status.BAD_REQUEST, 'User id should be an integer');
    }
    const mentor = await this.model().select('*', 'id=$1', [id]);
    if (!mentor.length) {
      return response.errorMessage(req, res, status.NOT_FOUND, `No mentors available with that Id ${id}`);
    }
    if (mentor[0].isMentor === false) {
      return response.errorMessage(req, res, status.FORBIDDEN, `The user With this Id ${id} is not a mentor`);
    }
    const data = lodash.pick(mentor[0],
      ['id', 'first_name', 'last_name', 'email',
        'address', 'bio', 'occupation', 'expertise', 'is_mentor', 'is_admin']);

    return response.successMessage(req, res, status.REQUEST_SUCCEEDED, 'this Mentor is available:', data);
  }
}
export default UserController;
