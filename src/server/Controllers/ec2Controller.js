const aws = require('@aws-sdk/client-ec2');

const client = new aws.EC2Client({ region: 'us-east-1' }); // Add config variables
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
    const instanceList = [];

    for (
      let i = 0;
      i < instanceDescriptionResponse.Reservations[0].Instances.length;
      i++
    ) {
      instanceList.push({
        instanceId:
          instanceDescriptionResponse.Reservations[0].Instances[i].InstanceId,
        state: instanceDescriptionResponse.Reservations[0].Instances[i].State,
      });
    }
    res.locals.instanceList = instanceList;
    return next();
  } catch (e) {
    return next({ err: e });
  }
};

ec2Controller.stopInstance = async (req, res, next) => {
  console.log('Stopping instance.');
  try {
    if (!req.body.instanceId) {
      return next({ err: 'Instance ID required to stop instance', code: 400 });
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
      return next({ err: 'Instance ID required to stop instance', code: 400 });
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
