import status from './StatusCode';

const notNumber = (id, res) => {
  if (isNaN(id.trim())) {
    return res.status(status.BAD_REQUEST).send(
      {
        status: status.BAD_REQUEST,
        error: 'Id should be an integer',
      },
    );
  }
};

export default notNumber;
