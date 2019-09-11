import status from './StatusCode';

export const notFound = (id, res) => res.status(status.NOT_FOUND).send({
  status: status.NOT_FOUND,
  error: `Session with id ${id} does not exist`,
});
export const conflict = (id, res) => res.status(status.REQUEST_CONFLICT).send({
  status: status.REQUEST_CONFLICT,
  error: `Session with id ${id} is already accepted`,
});

export const serverError = (err, res) => res.status(status.SERVER_ERROR).send({
  status: status.SERVER_ERROR,
  error: err,
});
