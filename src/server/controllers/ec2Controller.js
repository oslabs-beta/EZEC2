const ec2Commands = require('../helpers/ec2InstanceCommands');
const dotenv = require('dotenv').config();

const ec2Controller = {};
ec2Controller.getInstanceDetails = async (req, res, next) => {
  console.log('Getting all instance details.');
  try {
    const instanceDetails = await ec2Commands.getInstanceDetails();
    res.status(instanceDetails.status);
    res.locals.instanceList = instanceDetails.instanceList;

    res.locals.instanceList.forEach((instance) => {
      console.log(instance);
      if (instance.instanceId === process.env.MANAGER_INSTANCE_ID) {
        instance['managerInstance'] = true;
      } else {
        instance['managerInstance'] = false;
      }
    });

    return next();
  } catch (e) {
    console.log(e);
    return next({
      status: 401,
      message: { err: e.toString() },
    });
  }
};

ec2Controller.stopInstance = async (req, res, next) => {
  try {
    if (!req.body.instanceIds.length) {
      return next({
        message: { err: 'At least 1 Instance ID is required to stop instance' },
        status: 400,
      });
    }

    const stopResponse = await ec2Commands.stopInstance(req.body.instanceIds);
    console.log(stopResponse);

    res.status(stopResponse.$metadata.httpStatusCode);
    res.locals.stopResponse = stopResponse;

    return next();
  } catch (e) {
    console.log(e);
    return next({
      status: 401,
      message: { err: e.toString() },
    });
  }
};

ec2Controller.startInstance = async (req, res, next) => {
  try {
    if (!req.body.instanceIds.length) {
      return next({
        message: { err: 'At least 1 Instance ID required to start instance' },
        status: 400,
      });
    }

    const startResponse = await ec2Commands.startInstance(req.body.instanceIds);

    res.status(startResponse.$metadata.httpStatusCode);
    res.locals.startResponse = startResponse;

    return next();
  } catch (e) {
    return next({
      status: 401,
      message: { err: e.toString() },
    });
  }
};

module.exports = ec2Controller;
