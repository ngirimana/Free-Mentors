import Joi from '@hapi/joi';
import Session from '../models/session_model';
import status from '../helpers/StatusCode';
import notNumber from '../helpers/notNumber';
import User from '../models/user_model';

class SessionController {
  // create sessions
  create = (req, res) => {
    const schema = {
      mentorId: Joi.number().required(),
      questions: Joi.string().required(),
      status: Joi.string().default('pending'),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
      if (!User.isUserExist(req.body.mentorId)) {
        res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'Such user is not found' });
      }
      if (!User.checkMentor(req.body.mentorId)) {
        res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'Such mentor is not found' });
      }
      const session = Session.createSession(res, req.body, req.header('x-auth-token'));
      return res.status(status.REQUEST_SUCCEEDED).send(session);
    }
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
  }

  // accept sessionsn
  acceptSession = (req, res) => {
    notNumber(res, req.params.id);
    const result = Session.accept(res, req.params.id, req.header('x-auth-token'));
    return res.status(200).send({ status: 200, data: result });
  }

  // reject sessions
  rejectSession = (req, res) => {
    notNumber(res, req.params.id);
    const result = Session.reject(res, req.params.id, req.header('x-auth-token'));
    return res.status(200).send({ status: 200, data: result });
  }

  // get sessions
  yourOwnSessions = (req, res) => {
    const ownSessions = Session.getYourSessions(req, res, req.header('x-auth-token'));
    return res.status(200).send({ status: 200, data: ownSessions });
  }
}
export default SessionController;