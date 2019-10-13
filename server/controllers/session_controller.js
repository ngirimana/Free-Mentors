import dotenv from 'dotenv';
import Model from '../models/queries';
import status from '../helpers/StatusCode';
import Token from '../helpers/tokens';
import notNumber from '../helpers/notNumber';
import response from '../helpers/response';


dotenv.config();
class SessionController {
  static model() {
    return new Model('users');
  }

  static modelSession() {
    return new Model('sessions');
  }

  static createSession = async (req, res) => {
    try {
      let {
        mentorId, questions,
      } = req.body;
      const Status = 'pending';
      const menteeId = Token.verifyToken(req.header('x-auth-token'));
      const menteeEmail = Token.userInfosEmail(req.header('x-auth-token'));
      const mentor = await this.model().select('*', 'id=$1', [mentorId]);
      if (!mentor.length) {
        return response.errorMessage(req, res, status.NOT_FOUND, `No mentor available with id ${mentorId}`);
      }
      if (!mentor[0].is_mentor) {
        return response.errorMessage(req, res, status.FORBIDDEN, 'the requested Id is not a mentor');
      }
      const session = await this.modelSession().select('*', 'mentor_id=$1', [mentorId]);
      console.log(session.length);
      let count = 0;
      for (let i = 0; i < session.length; i += 1) {
        if (session[i].questions === questions) {
          count += 1;
        }
      }
      console.log(count);
      if (count >= 1) {
        return response.errorMessage(req, res, status.REQUEST_CONFLICT, 'You requested same question to one mentor');
      }
      const cols = 'mentor_id ,questions , mentee_id , mentee_email , status';
      const sels = `${mentorId}, '${questions}', ${menteeId}, '${menteeEmail}','${Status}'`;
      let row = await this.modelSession().insert(cols, sels);
      return response.successMessage(req, res, status.REQUEST_SUCCEEDED, 'session was created', row);
    } catch (err) {
      return res.status(status.SERVER_ERROR).json({
        status: status.SERVER_ERROR,
        error: err,

      });
    }
  }

  static acceptSessions = async (req, res) => {
    const mentorInfosId = Token.verifyToken(req.header('x-auth-token'));
    const { id } = req.params;
    if (isNaN(id)) { return notNumber(req, res); }
    const sessionToAccept = await this.modelSession().select('*', 'session_id=$1', [id]);
    if (!sessionToAccept.length) {
      return response.errorMessage(req, res, status.NOT_FOUND, `No mentor available with id ${mentorInfosId}`);
    }
    if (sessionToAccept[0].mentor_id !== mentorInfosId) {
      return response.errorMessage(req, res, status.FORBIDDEN, `Session with Id with id ${id} does not belong to you`);
    }

    if (sessionToAccept[0].status === 'accepted') {
      return response.errorMessage(req, res, status.REQUEST_CONFLICT, `Session  with id ${mentorInfosId} is already accepted`);
    }
    const acceptedSession = await this.modelSession().update('status=$1', 'session_id=$2', ['accepted', sessionToAccept[0].session_id]);
    return response.successMessage(req, res, status.REQUEST_SUCCEEDED, 'Session is successfully accpted', acceptedSession);
  }

  static rejectSessions = async (req, res) => {
    const mentorDataId = Token.verifyToken(req.header('x-auth-token'));
    const { id } = req.params;
    if (isNaN(id)) { return res.status(400).send({ status: 400, error: 'User id should be a number ' }); }
    const sessionToReject = await this.modelSession().select('*', 'session_id=$1', [id]);
    if (!sessionToReject.length) {
      return response.errorMessage(req, res, status.NOT_FOUND, `No mentor available with id ${mentorDataId}`);
    }
    if (sessionToReject[0].mentor_id !== mentorDataId) {
      return response.errorMessage(req, res, status.FORBIDDEN, `Session with Id with id ${id} does not belong to you`);
    }
    if (sessionToReject[0].status === 'accepted') {
      return response.errorMessage(req, res, status.REQUEST_CONFLICT, `Session  with id ${mentorDataId} is already accepted`);
    }
    const rejectedSession = await this.modelSession().update('status=$1', 'session_id=$2', ['rejected', sessionToReject[0].session_id]);
    return response.successMessage(req, res, status.REQUEST_SUCCEEDED, 'Session is successfully rejected', rejectedSession);
  }
}


export default SessionController;
