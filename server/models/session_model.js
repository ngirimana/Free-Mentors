import userInfo from '../helpers/userInfos';
import status from '../helpers/StatusCode';
import User from './user_model';


class Session {
  constructor() {
    this.sessions = [
      /* {
        sessionId: 1,
        mentorId: 2,
        menteeId: 1,
        questions: 'fbsdbfsbdfwjsebfwjebfj fbvsdjbvskdzvb vdjzvb sjdvb sdzbv xsdzmv',
        menteeEmail: 'safari@gmail.com',
        status: 'pending',
      }, */
    ];
  }

  // create sessions
  createSession = (res, payload, token) => {
    let sessionid = this.sessions.length + 1;

    let newSession = {
      sessionId: sessionid,
      mentorId: payload.mentorId,
      menteeId: userInfo(res, token),
      questions: payload.questions,
      menteeEmail: User.userEmail(userInfo(res, token)),
      status: 'pending',
    };
    this.sessions.push(newSession);
    newSession = {
      status: status.REQUEST_SUCCEEDED,
      message: 'Session successfully created',
      data: newSession,
    };
    return newSession;
  };

  // accept sessions
  accept = (res, id) => {
    const session = this.sessions.find((sid) => sid.sessionId === parseInt(id, 10));
    if (!session) {
      return res.status(status.NOT_FOUND).send({
        status: status.NOT_FOUND,
        error: 'This session  is not found!',
      });
    }
    if (session.status === 'Accept') {
      return res.status(status.FORBIDDEN).send({
        status: status.FORBIDDEN,
        error: 'This session is already accepted',
      });
    }
    if (session.status === 'Reject') {
      return res.status(status.FORBIDDEN).send({
        status: status.FORBIDDEN,
        error: 'This session is already rejected',
      });
    }

    session.status = 'Accept';
    return session;
  }

  // reject sessions
  reject = (res, id) => {
    const session = this.sessions.find((sid) => sid.sessionId === parseInt(id, 10));
    if (!session) return res.status(404).send({ status: 404, error: 'this session  is not found!' });
    if (session.status === 'Accept') {
      return res.status(status.FORBIDDEN).send({
        status: status.FORBIDDEN,
        error: 'This session is already accepted',
      });
    }
    if (session.status === 'Reject') {
      return res.status(status.FORBIDDEN).send({
        status: status.FORBIDDEN,
        error: 'This session is already rejected',
      });
    }
    session.status = 'Reject';
    return session;
  }

  // get sessions
  getYourSessions = (req, res, token) => {
    const user = User.grabUserDetail(userInfo(res, token));
    if (user.is_mentor === false) {
      const yourSessions = this.sessions.filter((session) => session.menteeId
        === userInfo(res, token));
      if (yourSessions.length === 0) {
        return res.status(404).send({ status: 404, error: 'Your sessions  are not found!' });
      }
      return yourSessions;
    }
    if (user.is_mentor === true) {
      const yourSessions = this.sessions.filter((session) => session.mentorId
        === userInfo(res, token));
      if (yourSessions.length === 0) {
        return res.status(404).send({ status: 404, error: 'Your sessions  are not found!' });
      }
      return yourSessions;
    }
  }
}
export default new Session();
