const cron = require('node-cron');
const ec2Commands = require('../helpers/ec2InstanceCommands');
const models = require('../models/scheduledJobModel');

const runOnce = (fn) => {
  let hasRun = false;
  return (...args) => {
    if (hasRun) {
      console.log('This function already ran once');
    } else {
      fn(...args);
      hasRun = true;
    }
  };
};

const cronCache = {};

const scheduleSavedJobsOnce = runOnce((jobs) => {
  for (let i = 0; i < jobs.length; i++) {
    const cronExpression = jobs[i].cronSchedule;
    switch (jobs[i].jobType) {
      case 'startInstance':
        console.log('Setting cron function for start instance');
        cronFunction = async () => {
          ec2Commands.startInstance(jobs[i].instanceId);
        };

        break;
      case 'stopInstance':
        console.log('Setting cron function for stop instance');
        cronFunction = () => {
          ec2Commands.stopInstance(jobs[i].instanceId);
        };
        break;
      default:
        console.log('Error: Unrecognized case');
        return;
    }
    const job = cron.schedule(cronExpression, cronFunction);
    cronCache[jobs[i]._id] = job;
  }
});

const schedulerController = {};

function parseCronExpression(req) {
  let expression = '';
  if (req.body.minute || req.body.minute === 0) {
    // only expect a single value
    expression += req.body.minute.toString() + ' ';
  } else {
    expression += '* ';
  }
  if (req.body.hour || req.body.hour === 0) {
    // only expect a single value
    expression += req.body.hour.toString() + ' ';
  } else {
    expression += '* ';
  }

  // Not currently supporting customization by day of month
  expression += '* ';

  // Not currently supporting customization by month
  expression += '* ';

  if (req.body.dayOfWeek.length) {
    req.body.dayOfWeek.join(',');
    expression += req.body.dayOfWeek.toString();
  } else {
    expression += '*';
  }
  return expression;
}

schedulerController.getScheduledJobs = async (req, res, next) => {
  try {
    const jobList = await models.Job.find({});
    res.locals = jobList;
    scheduleSavedJobsOnce(jobList);
    return next();
  } catch (e) {
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
      cronFunction = async () => {
        ec2Commands.startInstance(req.body.instanceIds);
      };

      break;
    case 'stopInstance':
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
    // clear existing schedule for existing job
    const result = await models.Job.findOneAndDelete({
      $and: [{ instanceId: req.body.instanceIds, jobType: req.body.jobAction }],
    });

    if (result) {
      delete cronCache[result._id];
    }

    const job = cron.schedule(cronExpression, cronFunction, {
      timezone: req.body.timezone,
    });
    const jobResult = await models.Job.create({
      cronSchedule: cronExpression,
      jobType: req.body.jobAction,
      instanceId: req.body.instanceIds,
    });
    cronCache[jobResult._id] = job;
    return next();
  } catch (e) {
    console.log(e);
    return next({
      message: { err: e.toString() },
    });
  }
};

schedulerController.deleteSchedule = async (req, res, next) => {
  try {
    const result = await models.Job.findOneAndDelete({
      $and: [{ instanceId: req.body.instanceIds, jobType: req.body.jobAction }],
    });

    if (result) {
      delete cronCache[result._id];
    }

    return next();
  } catch (e) {
    console.log(e);
    return next({
      message: { err: e.toString() },
    });
  }
};

module.exports = schedulerController;
