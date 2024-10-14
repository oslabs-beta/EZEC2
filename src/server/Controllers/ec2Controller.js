const aws = require('@aws-sdk/client-ec2');
const { fromSSO } = require('@aws-sdk/credential-provider-sso');

const client = new aws.EC2Client({
  region: 'us-east-1',
  // credentials: fromSSO({ profile: '' }),
}); // Add config variables
const ec2Controller = {};

ec2Controller.getInstanceDetails = async (req, res, next) => {
  console.log('Getting instance details.');
  try {
    const getIntsanceInput = {
      DryRun: false,
    };
    const instanceDescriptionCommand = new aws.DescribeInstancesCommand(
      getIntsanceInput
    );
    const instanceDescriptionResponse = await client.send(
      instanceDescriptionCommand
    );
    console.log(instanceDescriptionResponse.Reservations[0].Instances[0]);
    const instanceList = [];

    for (let i = 0; i < instanceDescriptionResponse.Reservations.length; i++) {
      const currentInstance =
        instanceDescriptionResponse.Reservations[i].Instances[0];
      instanceList.push({
        instanceId: currentInstance.InstanceId,
        state: currentInstance.State,
        tags: currentInstance.Tags,
        securityGroups: currentInstance.SecurityGroups,
      });
    }

    res.locals.instanceList = instanceList;
    return next();
  } catch (e) {
    console.log(e);
    return next({ err: e });
  }
};

ec2Controller.stopInstance = async (req, res, next) => {
  console.log('Stopping instance.');
  try {
    if (!req.body.instanceId) {
      return next({
        message: { err: 'Instance ID required to stop instance' },
        status: 400,
      });
    }

    const instanceIdArray = [];
    instanceIdArray.push(req.body.instanceId);
    console.log(instanceIdArray);

    const input = {
      InstanceIds: instanceIdArray,
      Hibernate: false,
      DryRun: false,
      Force: false,
    };
    const command = new aws.StopInstancesCommand(input);
    const stopResponse = await client.send(command);
    console.log(stopResponse);
    res.locals.stopResponse = stopResponse;
    return next();
  } catch (e) {
    return next({ err: e });
  }
};

ec2Controller.startInstance = async (req, res, next) => {
  console.log('Starting instance.');
  try {
    if (!req.body.instanceId) {
      return next({
        message: { err: 'Instance ID required to start instance' },
        status: 400,
      });
    }

    const instanceIdArray = [];
    instanceIdArray.push(req.body.instanceId);
    console.log(instanceIdArray);

    const startInput = {
      InstanceIds: instanceIdArray,
      DryRun: false,
    };
    const startCommand = new aws.StartInstancesCommand(startInput);
    const startResponse = await client.send(startCommand);
    console.log(startResponse);
    res.locals.stopResponse = startResponse;
    return next();
  } catch (e) {
    console.log(e);
    return next({ err: e });
  }
};

module.exports = ec2Controller;
