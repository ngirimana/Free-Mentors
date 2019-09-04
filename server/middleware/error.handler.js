
import StatusCode from '../helpers/StatusCode';

const isInvalidJson = (err, req, res, next) => {
  // This check makes sure this is a JSON parsing issue,
  // but it might be
  // coming from any middleware, not just body-parser:

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(StatusCode.BAD_REQUEST).send({
      status: StatusCode.BAD_REQUEST,
      error: 'Invalid JSON format!',
    });
  }
  next();
};

export default isInvalidJson;
