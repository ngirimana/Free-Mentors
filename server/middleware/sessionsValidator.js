import Joi from 'joi';
import status from '../helpers/StatusCode';
import response from '../helpers/response'

const sessionValidate = (req, res, next) => {
  const schema = {
    mentorId: Joi.number().required(),
    questions: Joi.string().required(),
    status: Joi.string().default('pending'),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return response.errorMessage(req, res, status.BAD_REQUEST, `${result.error.details[0].message}`);
  }
  next();
};

export default sessionValidate;
