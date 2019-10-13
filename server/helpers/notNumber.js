
export const notNumber = (req, res) => res.status(400).send({ status: 400, error: 'Entry id should be a number ' });
export default notNumber;
