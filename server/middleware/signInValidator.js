import Joi from 'joi';
import status from '../helpers/StatusCode';

const userValidate = (req, res, next) => {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(10).required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
  }
  next();
};
export default userValidate;
