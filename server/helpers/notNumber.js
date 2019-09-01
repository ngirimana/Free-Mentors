import status from './StatusCode';

const notNumber = (res, id) => {
  if (isNaN(id)) {
    return res.status(status.BAD_REQUEST).send({ status: status.BAD_REQUEST, error: 'Id should be an integer' });
  }
};

export default notNumber;
