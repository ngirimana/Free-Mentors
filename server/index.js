import express from 'express';
import bodyParse from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import status from './helpers/StatusCode';
import config from './config/default';
import userRoute from './routes/user_route';
import errorHandler from './middleware/error.handler';

import swaggerDocument from '../app.json';

const app = express();

app.use(bodyParse.json());

app.use('/api/v2/auth', errorHandler, userRoute);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', (req, res) => {
  res.status(status.NOT_FOUND).send({ status: status.NOT_FOUND, error: 'Incorrect route' });
});

const { port } = config;
app.listen(port, () => console.log(`Listening on port ${port}...`));

export default app;
