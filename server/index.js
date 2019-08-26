import express from 'express';
import bodyParse from 'body-parser';
import status from './helpers/StatusCode';
import config from './config/default';
import userRoute from './routes/user_route';


const app = express();

app.use(bodyParse.json());
// Custom path: For signin and signup endpoints
app.use('/api/v1/auth', userRoute);

// Default page
app.use('/', (req, res) => {
  res.status(status.NOT_FOUND).send({
    status: status.NOT_FOUND,
    error: 'Incorrect route',
  });
});


const { port } = config;
app.listen(port, () => console.log(`Listening on port ${port}...`));
export default app;
