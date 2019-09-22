import lodash from 'lodash';
import Model from '../models/queries';
import notNumber from '../helpers/notNumber';
import status from '../helpers/StatusCode';
import response from '../helpers/response';

class MentorController {
  static model() {
    return new Model('users');
  }

  static changeToMentor = async (req, res) => {
    const { id } = req.params;
    notNumber(id, res);
    const mentor = await this.model().select('*', 'id=$1', [id]);
    if (!mentor[0]) {
      return response.errorMessage(req, res, status.NOT_FOUND, `No user available with id ${id}`);
    }
    if (mentor[0].is_mentor === true) {
      return response.errorMessage(req, res, status.REQUEST_CONFLICT, 'This user is already a mentor');
    }
    await this.model().update('is_mentor=$1', 'id= $2', [true, mentor[0].id]);
    const output = await this.model().select('*', 'id=$1', [id]);
    const data = lodash.pick(output[0], 'id', 'first_name', 'last_name', 'email', 'address', 'bio', 'occupation', 'expertise', 'is_mentor', 'is_admin');
    return response.successMessage(req, res, status.REQUEST_SUCCEEDED, 'User changed to a mentor successfully', data);
  }


  static getAllMentors = async (req, res) => {
    const mentors = [];
    const ismentor = true;
    const mentor = await this.model().select('*', 'is_mentor=$1', [ismentor]);
    for (let item = 0; item < mentor.length; item += 1) {
      mentors.push(lodash.pick(mentor[item], ['id', 'first_name', 'last_name', 'email',
        'address', 'bio', 'occupation', 'expertise', 'is_mentor', 'is_admin']));
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

  static getSpecificMentor = async (req, res) => {
    const mentorId = req.params.id;
    notNumber(mentorId, res);
    try {
      const userStatus = true;
      let mentor = await this.model().select('*', 'id=$1 AND is_mentor=$2', [mentorId, userStatus]);
      if (!mentor[0]) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          error: `Mentor with this Id ${mentorId} does not exist`,
        });
      }
      return res.status(status.REQUEST_SUCCEEDED).send({
        status: status.REQUEST_SUCCEEDED,
        message: `More informtion about user with id ${mentorId} are`,
        data: lodash.pick(mentor, 'id', 'first_name', 'last_name', 'email', 'address', 'bio', 'occupation', 'expertise', 'is_mentor', 'is_admin'),
      });
    } catch (err) {
      return res.status(200).send({
        status: 200,
        error: err,
      });
    }
  }
}
export default MentorController;
