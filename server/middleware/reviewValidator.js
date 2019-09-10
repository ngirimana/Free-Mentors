import Joi from 'joi';
import status from '../helpers/StatusCode';

const reviewValidate = (req, res, next) => {
  const schema = {
    score: Joi.number().required(),
    remark: Joi.string().required(),
  };
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: `${result.error.details[0].message}` });
  }
  next();
};

export default reviewValidate;
