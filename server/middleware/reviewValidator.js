import Joi from 'joi';
import status from '../helpers/StatusCode';
import response from '../helpers/response';

const reviewValidate = (req, res, next) => {
  const schema = {
    score: Joi.number().required(),
    remark: Joi.string().required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return response.errorMessage(req, res, status.BAD_REQUEST, `${result.error.details[0].message}`);
  }
  next();
};

export default reviewValidate;
