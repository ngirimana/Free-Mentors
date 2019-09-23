import Joi from 'joi';
import status from '../helpers/StatusCode';
import response from '../helpers/response';

const userValidate = (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(10).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return response.errorMessage(req, res, status.BAD_REQUEST, `${result.error.details[0].message}`);
  }
  next();
};
export default userValidate;
