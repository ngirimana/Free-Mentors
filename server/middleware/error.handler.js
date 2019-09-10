
import StatusCode from '../helpers/StatusCode';

const isInvalidJson = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(StatusCode.BAD_REQUEST).send({
      status: StatusCode.BAD_REQUEST,
      error: 'Invalid JSON format!',
    });
  }
  next();
};

export default isInvalidJson;
