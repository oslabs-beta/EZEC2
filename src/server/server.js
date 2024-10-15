const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const ec2Router = require('./routes/ec2Route.js');
const cloudwatchRouter = require('./routes/cloudwatchRoute.js');

app.use(express.json());

app.use('/ec2', ec2Router);

app.use('/cloudwatch', cloudwatchRouter);

app.use('*', (req, res) => {
  console.log('hitting 404 message');
  return res.sendStatus(404);
});

app.use('/', (err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown error',
    status: 500,
    message: { err: 'An error occurred.' },
  };
  const errorObject = Object.assign({}, defaultError, err);
  return res.status(errorObject.status).json(errorObject.message);
});

app.listen(3000, () => console.log('Listening on port 3000'));
