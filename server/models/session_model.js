import userInfo from '../helpers/userInfos';
import status from '../helpers/StatusCode';
import User from './user_model';


class Session {
  constructor() {
    this.sessions = [];
  }


  // create sessions
  createSession = (res, payload, token) => {
    let { mentorId, questions } = payload;
    let sessionid = this.sessions.length + 1;

    let newSession = {
      sessionId: sessionid,
      mentorId,
      menteeId: userInfo(res, token),
      questions,
      mentorEmail: User.userEmail(mentorId),
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
  accept = (res, id, token) => {
    const session = this.sessions.find((sid) => sid.sessionId === parseInt(id, 10)
    && sid.mentorId === userInfo(res, token));
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
  reject = (res, id, token) => {
    const session = this.sessions.find((sid) => sid.sessionId === parseInt(id, 10)
     && sid.mentorId === userInfo(res, token));
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

  mentorInfo = (res, id) => {
    const anySession = this.sessions.find((session) => session.sessionId === parseInt(id, 10));
    if (anySession) {
      return anySession.mentorId;
    }
  }

  // check if session is accepted
  sessionStatus = (id) => {
    const session = this.sessions.find((sid) => sid.sessionId === parseInt(id, 10));
    if (session.status === 'Accept') {
      return true;
    }
  }

  // check if session is yours
  checkYours=(id, token, res) => {
    const mine = this.sessions.find((session) => session.sessionId === parseInt(id, 10));
    if (mine.menteeId === userInfo(res, token)) {
      return true;
    }
  }


  uniqueSession = (id) => this.sessions.find((session) => session.sessionId === parseInt(id, 10));
}
export default new Session();