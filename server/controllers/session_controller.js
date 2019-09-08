import Session from '../models/session_model';
import status from '../helpers/StatusCode';
import notNumber from '../helpers/notNumber';
import User from '../models/user_model';

class SessionController {
  // create sessions
  create = (req, res) => {
    if (!User.isUserExist(req.body.mentorId)) {
      res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'Such user is not found' });
    }
    if (!User.checkMentor(req.body.mentorId)) {
      res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'Such mentor is not found' });
    }
    const session = Session.createSession(res, req.body, req.header('x-auth-token'));
    return res.status(status.REQUEST_SUCCEEDED).send(session);
  }


  // accept sessionsn
  acceptSession = (req, res) => {
    notNumber(res, req.params.id);
    const result = Session.accept(res, req.params.id, req.header('x-auth-token'));
    return res.status(200).send({ status: 200, data: { data: result } });
  }

  // reject sessions
  rejectSession = (req, res) => {
    notNumber(res, req.params.id);
    const result = Session.reject(res, req.params.id, req.header('x-auth-token'));
    return res.status(200).send({ status: 200, data: { data: result } });
  }

  // get sessions
  yourOwnSessions = (req, res) => {
    const ownSessions = Session.getYourSessions(req, res, req.header('x-auth-token'));
    return res.status(200).send({ status: 200, data: { data: ownSessions } });
  }
}
export default SessionController;
