import lodash from 'lodash';
import Model from '../models/queries';
import notNumber from '../helpers/notNumber';
import status from '../helpers/StatusCode';

class MentorController {
  static model() {
    return new Model('users');
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

  static getSpecificMentor = async (req, res) => {
    const mentorId = req.params.id;
    notNumber(mentorId, res);
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
      message: `More informtion about user with id ${mentorId} are:`,
      data: lodash.pick(mentor[0], 'id', 'first_name', 'last_name', 'email', 'address', 'bio', 'occupation', 'expertise'),
    });
  }
}
export default MentorController;
