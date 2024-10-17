const aws = require('@aws-sdk/client-ec2');
const { fromSSO } = require('@aws-sdk/credential-provider-sso');
require('dotenv').config();

const client = new aws.EC2Client({
  region: 'us-east-1',
  // credentials: fromSSO({ profile: process.env.PROFILE }),
}); // Add config variables

// const client = new aws.EC2Client({
//   region: 'us-east-1',
// }); // Add config variables
const ec2Controller = {};
ec2Controller.getInstanceDetails = async (req, res, next) => {
  console.log('Getting all instance details.');
  try {
    const instanceDescriptionCommand = new aws.DescribeInstancesCommand({
      DryRun: false,
    });
    const instanceDescriptionResponse = await client.send(
      instanceDescriptionCommand
    );
    // console.log(instanceDescriptionResponse);
    const instanceList = [];

    for (let i = 0; i < instanceDescriptionResponse.Reservations.length; i++) {
      for (
        let j = 0;
        j < instanceDescriptionResponse.Reservations[i].Instances.length;
        j++
      ) {
        const currentInstance =
          instanceDescriptionResponse.Reservations[i].Instances[j];
        instanceList.push({
          instanceId: currentInstance.InstanceId,
          state: currentInstance.State,
          tags: currentInstance.Tags,
          securityGroups: currentInstance.SecurityGroups,
        });
      }
    }

    res.status(instanceDescriptionResponse.$metadata.httpStatusCode);
    res.locals.instanceList = instanceList;

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
  console.log('Stopping instance.');
  try {
    if (!req.body.instanceIds.length) {
      return next({
        message: { err: 'At least 1 Instance ID is required to stop instance' },
        status: 400,
      });
    }

    const command = new aws.StopInstancesCommand({
      InstanceIds: req.body.instanceIds,
      Hibernate: false,
      DryRun: false,
      Force: false,
    });

    const stopResponse = await client.send(command);
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
  console.log('Starting instance.');
  try {
    if (!req.body.instanceIds.length) {
      return next({
        message: { err: 'At least 1 Instance ID required to start instance' },
        status: 400,
      });
    }

    const startCommand = new aws.StartInstancesCommand({
      InstanceIds: req.body.instanceIds,
      DryRun: false,
    });

    const startResponse = await client.send(startCommand);
    console.log(startResponse);

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
