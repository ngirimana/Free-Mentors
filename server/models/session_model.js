import userInfo from '../helpers/userInfos';
import status from '../helpers/StatusCode';
import User from './user_model';


class Session {
  constructor() {
    this.sessions = [
      {
        sessionId: 1,
        mentorId: 2,
        menteeId: 1,
        questions: 'fbsdbfsbdfwjsebfwjebfj fbvsdjbvskdzvb vdjzvb sjdvb sdzbv xsdzmv',
        menteeEmail: 'safari@gmail.com',
        status: 'pending',
      },
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
}
export default new Session();
