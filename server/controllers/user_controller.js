import hashPassword from '../helpers/hashPassword';
import Model from '../models/queries';
import generateAuthToken from '../helpers/tokens';
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
      is_admin = false;
      const user = await this.model().select('*', 'email=$1', [email]) || [];
      if (user[0]) {
        return res.status(status.REQUEST_CONFLICT).json({
          status: status.REQUEST_CONFLICT,
          error: `${email} already exists`,

        });
      }
      password = await hashPassword.encryptPassword(password);

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
}

export default UserController;
