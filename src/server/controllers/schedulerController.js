const cron = require('node-cron');
const ec2Commands = require('../helpers/ec2InstanceCommands');
const models = require('../models/scheduledJobModel');

const schedulerController = {};

// Use this in the frontend instead
function parseCronExpression(req) {
  let expression = '';
  if (req.body.minute) {
    // only expect a single value
    expression += req.body.minute.toString() + ' ';
  } else {
    expression += '*';
  }
  if (req.body.hour) {
    // only expect a single value
    expression += req.body.hour.toString();
  } else {
    expression += ' *';
  }

  // Not currently supporting customization by day of month
  expression += ' *';

  // Not currently supporting customization by month
  expression += ' * ';

  if (req.body.dayOfWeek) {
    req.body.dayOfWeek.join(',');
    expression += req.body.dayOfWeek.toString();
  } else {
    expression += '*';
  }
  return expression;
}

schedulerController.getScheduledJobs = async (req, res, next) => {
  try {
    return next();
  } catch (e) {
    console.log(e);
    return next({
      message: { err: e.toString() },
    });
  }
};

schedulerController.scheduleJob = async (req, res, next) => {
  const cronExpression = parseCronExpression(req);
  let cronFunction;

  switch (req.body.jobAction) {
    case 'startInstance':
      console.log('Setting cron function for start instance');
      cronFunction = async () => {
        ec2Commands.startInstance(req.body.instanceIds);
      };

      break;
    case 'stopInstance':
      console.log('Setting cron function for stop instance');
      cronFunction = () => {
        ec2Commands.stopInstance(req.body.instanceIds);
      };
      break;
    default:
      return next({
        message: {
          err: 'Unknown instance command. Expected jobAction to be either startInstance or stopInstance',
        },
      });
  }

  try {
    cron.schedule(cronExpression, cronFunction, {
      timezone: req.body.timezone,
    });
    const jobResult = await models.Job.create({
      cronSchedule: cronExpression,
      jobType: req.body.jobAction,
      instanceId: req.body.instanceIds,
    });
    console.log(jobResult);
    return next();
  } catch (e) {
    console.log(e);
    return next({
      message: { err: e.toString() },
    });
  }
};

// schedulerController.executeJob = async (req, res, next) => {
//   try {
//     return next();
//   } catch (e) {
//     console.log(e);
//     return next({
//       message: { err: e.toString() },
//     });
//   }
// };

module.exports = schedulerController;
