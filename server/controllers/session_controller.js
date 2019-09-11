import dotenv from 'dotenv';
import status from '../helpers/StatusCode';
import Model from '../models/queries';
import { userId, userEmail } from '../helpers/userData';
import notNumber from '../helpers/notNumber';
import { notFound, conflict, serverError } from '../helpers/response';

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
      serverError(err, res);
    }
  }

  static acceptSession = async (req, res) => {
    const mentorData = userId(req.header('x-auth-token'), res);
    const { id } = req.params;
    notNumber(id, res);
    try {
      const accept = await this.session().select('*', 'session_id=$1', [id]);

      if (!accept[0]) {
        notFound(id, res);
      }
      if (accept[0].status === 'accepted') {
        conflict(id, res);
      }

      if (accept[0].status === 'pending' && accept[0].mentor_id === mentorData) {
        await this.session().update('status=$1', 'session_id=$2', ['accepted', accept[0].session_id]);
        const accepted = await this.session().select('*', 'session_id=$1', [id]);
        return res.status(status.REQUEST_SUCCEEDED).send({
          status: status.REQUEST_SUCCEEDED,
          message: 'Mentorship session has been accepted',
          data: accepted[0],
        });
      }
    } catch (err) {
      serverError(err, res);
    }
  }


  static rejectSession = async (req, res) => {
    const mentorDetail = userId(req.header('x-auth-token'), res);
    const { id } = req.params;
    notNumber(id, res);
    try {
      const reject = await this.session().select('*', 'session_id=$1', [id]);

      if (!reject[0]) {
        notFound(id, res);
      }
      if (reject[0].status === 'accepted') {
        conflict(id, res);
      }
      if (reject[0].status === 'rejected') {
        conflict(id, res);
      }

      if (reject[0].status === 'pending' && reject[0].mentor_id === mentorDetail) {
        await this.session().update('status=$1', 'session_id=$2', ['rejected', reject[0].session_id]);
        const rejected = await this.session().select('*', 'session_id=$1', [id]);
        return res.status(status.REQUEST_SUCCEEDED).send({
          status: status.REQUEST_SUCCEEDED,
          message: 'Mentorship session has been rejected',
          data: rejected[0],
        });
      }
    } catch (err) {
      serverError(err, res);
    }
  }
}

export default SessionController;
