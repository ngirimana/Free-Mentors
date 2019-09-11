import dotenv from 'dotenv';
import status from '../helpers/StatusCode';
import Model from '../models/queries';
import { userId, userEmail } from '../helpers/userData';
import notNumber from '../helpers/notNumber';


dotenv.config();
class SessionController {
  static model() {
    return new Model('users');
  }

  static session() {
    return new Model('sessions');
  }

  static createSession = async (req, res) => {
    try {
      let {
        mentorId,
        questions,
      } = req.body;
      const Status = 'pending';
      const menteeId = userId(req.header('x-auth-token'), res);

      const menteeEmail = userEmail(req.header('x-auth-token'), res);
      notNumber(mentorId, res);
      const mentor = await this.model().select('*', 'id=$1', [mentorId]);
      if (!mentor[0]) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          error: `Mentor  with id ${mentorId} does not exist`,
        });
      }
      if (!mentor[0].is_mentor) {
        return res.status(status.NOT_FOUND).send({
          status: status.NOT_FOUND,
          error: `User with id ${mentorId} is not a mentor`,
        });
      }
      const columns = 'mentor_id, questions,mentee_id,mentee_email,status';
      const sessionData = `'${mentorId}', '${questions}', '${menteeId}', '${menteeEmail}','${Status}'`;
      let row = await this.session().insert(columns, sessionData);
      return res.status(status.REQUEST_SUCCEEDED).json({
        status: status.REQUEST_SUCCEEDED,
        message: 'Session  created successfully',
        data: row,
      });
    } catch (err) {
      return res.status(500).json({
        status: status.SERVER_ERROR,
        error: err,
      });
    }
  }
}

export default SessionController;
