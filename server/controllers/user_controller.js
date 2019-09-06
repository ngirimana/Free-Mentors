import Joi from '@hapi/joi';
import User from '../models/user_model';
import notNumber from '../helpers/notNumber';
import status from '../helpers/StatusCode';

class UserController {
  signUp = (req, res) => {
    // validation of  request  payload
    // using joi

    const schema = {
      first_name: Joi.string().regex(/^[a-zA-Z]+$/).required(),
      last_name: Joi.string().regex(/^[a-zA-Z]+$/).required(),
      email: Joi.string().email().required(),
      password: Joi.string().alphanum().min(10).required(),
      address: Joi.string().required(),
      bio: Joi.string().required(),
      occupation: Joi.string().required(),
      expertise: Joi.string().required(),
      is_mentor: Joi.boolean().default(false),
      is_admin: Joi.boolean().default(false),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
      if (User.isEmailTaken(req.body.email)) {
        // email exist
        return res.status(status.REQUEST_CONFLICT).send({ status: status.REQUEST_CONFLICT, error: `${req.body.email} is already taken` });
      }
      // when
      const user = User.create(req.body);
      return res.status(status.RESOURCE_CREATED).send(user);
    }
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
  };

  signIn = (req, res) => {
    // request validation
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.required(),
    };
    const result = Joi.validate(req.body, schema);
    if (result.error == null) {
      // when there is no error

      const user = User.login(req.body);
      if (user.status === status.REQUEST_SUCCEDED) {
        res.set('x-auth-token', user.data.token);
        return res.status(status.REQUEST_SUCCEDED).send(user);
      }
      return res.status(status.UNAUTHORIZED).send(user);
    }
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
  };


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