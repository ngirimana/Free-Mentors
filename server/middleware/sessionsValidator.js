import Joi from 'joi';
import status from '../helpers/StatusCode';

const sessionValidate = (req, res, next) => {
  const schema = {
    mentorId: Joi.number().required(),
    questions: Joi.string().required(),
    status: Joi.string().default('pending'),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
  }
  next();
};

export default sessionValidate;
