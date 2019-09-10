import lodash from 'lodash';
import encryptPassword from '../helpers/hashPassword';
import decryptPassword from '../helpers/decreypt';
import Model from '../models/queries';
import generateAuthToken from '../helpers/tokens';
import notNumber from '../helpers/notNumber';
import status from '../helpers/StatusCode';

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
      is_admin = true;
      const user = await this.model().select('*', 'email=$1', [email]) || [];
      if (user[0]) {
        return res.status(status.REQUEST_CONFLICT).json({
          status: status.REQUEST_CONFLICT,
          error: `${email} already exists`,
        });
      }
      password = await encryptPassword(password);
      const columns = 'first_name, last_name, email, password, address, bio, occupation, expertise, is_mentor, is_admin';
      const data = `'${first_name}', '${last_name}', '${email}', '${password}','${address}','${bio}','${occupation}','${expertise}',${is_mentor},${is_admin}`;
      const rows = await this.model().insert(columns, data) || [];
      if (rows.length) {
        let token = generateAuthToken(rows[0].id, rows[0].is_mentor, rows[0].is_admin);
        return res.status(status.RESOURCE_CREATED).json({
          status: status.RESOURCE_CREATED,
          message: 'User signed up successfully',
          data: {
            token,
            first_name,
            last_name,
            email,
            address,
            bio,
            occupation,
            expertise,
          },
        });
      }
      return res.json(rows);
    } catch (error) {
      return res.status(500).json({
        status: status.SERVER_ERROR,
        error: error.message,
      });
    }
  }

  static signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
      const login = await this.model().select('*', 'email=$1', [email]);
      if (login[0] && (decryptPassword(password, login[0].password))) {
        let token = generateAuthToken(login[0].id, login[0].is_mentor, login[0].is_admin);
        return res.status(status.REQUEST_SUCCEEDED).json({
          status: status.REQUEST_SUCCEEDED,
          message: 'user signed in successfully',
          data: {
            token,
          },
        });
      }
      return res.status(status.UNAUTHORIZED).json({
        status: status.UNAUTHORIZED,
        error: 'Invalid Email or Password',
      });
    } catch (err) {
      return res.status(status.SERVER_ERROR).json({
        status: status.SERVER_ERROR,
        error: err,
      });
    }
  }

  static changeToMentor = async (req, res) => {
    const { id } = req.params;
    notNumber(id, res);

    try {
      const mentor = await this.model().select('*', 'id=$1', [id]);
      if (mentor[0].is_mentor === true) {
        return res.status(status.REQUEST_CONFLICT).send({
          status: status.REQUEST_CONFLICT,
          error: 'This user is already a mentor',
        });
      }
      let result = await this.model().update('is_mentor=$1', 'id= $2', [true, mentor[0].id]);
      return res.status(status.REQUEST_SUCCEEDED).send({
        status: status.REQUEST_SUCCEEDED,
        Message: 'User changed to a mentor successfully',
        data: {
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
          address: result.address,
          bio: result.bio,
          occupation: result.occupation,
          expertise: result.expertise,
          is_mentor: result.is_mentor,
        },
      });
    } catch (err) {
      return res.status(status.NOT_FOUND).send({
        status: status.NOT_FOUND,
        error: `User with this id ${id} does not exist`,
      });
    }
  }

  static getAllMentors = async (req, res) => {
    const mentors = [];
    const ismentor = true;
    const mentor = await this.model().select('*', 'is_mentor=$1', [ismentor]);

    console.log(mentor.length);
    for (let item = 0; item < mentor.length; item += 1) {
      mentors.push(lodash.pick(mentor[item],
        ['id', 'first_name', 'last_name', 'email',
          'address', 'bio', 'occupation', 'expertise']));
    }
    if (mentors.length <= 0) {
      return res.status(status.NOT_FOUND).send({
        status: status.NOT_FOUND,
        error: 'No mentors available',
      });
    }
    return res.status(status.REQUEST_SUCCEEDED).send({
      status: status.REQUEST_SUCCEEDED,
      message: 'Available mentors',
      data: mentors,
    });
  }
}
export default UserController;
