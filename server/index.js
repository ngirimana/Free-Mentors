import express from 'express';
import bodyParse from 'body-parser';
import status from './helpers/StatusCode';
import config from './config/default';
import userRoute from './routes/user_route';

import adminRoute from './routes/admin_route';
import mentorRoute from './routes/mentor_route';


const app = express();

app.use(bodyParse.json());
// Custom path: For signin and signup endpoints
app.use('/api/v1/auth', userRoute);

// path for  changing user to a mentor
app.use('/api/v1', adminRoute);
// view mentors
app.use('/api/v1/', mentorRoute);

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
