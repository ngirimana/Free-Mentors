import Joi from 'joi';
import status from '../helpers/StatusCode';
import response from '../helpers/response';

const userValidate = (req, res, next) => {
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
  if (result.error) {
    return res.status(400).send({ status: 400, error: `${result.error.details[0].message}` });
  }
  next();
};
export default userValidate;
