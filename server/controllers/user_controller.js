import User from '../models/user_model';
import notNumber from '../helpers/notNumber';
import status from '../helpers/StatusCode';

class UserController {
  signUp = (req, res) => {
    if (User.isEmailTaken(req.body.email)) {
      // email exist
      return res.status(status.REQUEST_CONFLICT).send({ status: status.REQUEST_CONFLICT, error: `${req.body.email} is already taken` });
    }
    const user = User.create(req.body);
    return res.status(status.RESOURCE_CREATED).send(user);
  }

  signIn = (req, res) => {
    const user = User.login(req.body);
    if (user.status === status.REQUEST_SUCCEDED) {
      res.set('x-auth-token', user.data.token);
      return res.status(status.REQUEST_SUCCEDED).send(user);
    }
    return res.status(status.UNAUTHORIZED).send(user);
  }


  // change user to mentor
  toMentor = (req, res) => {
    notNumber(res, req.params.id);
    const data = User.changeToMentor(res, req.params.id);
    return res.status(200).send({ status: 200, message: 'User account changed to mentor', data });
  }

  // display all mentors
  allmentors = (req, res) => {
    const mentors = User.getAllMentors(req, res);
    return res.status(200).send({ status: 200, data: { mentors } });
  }

  // view specific mentor
  specificMentor = (req, res) => {
    notNumber(res, req.params.id);
    const data = User.uniqueMentor(res, req.params.id);
    return res.status(200).send({ status: 200, data });
  }
}

export default UserController;
