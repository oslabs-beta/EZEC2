const aws = require('@aws-sdk/client-ec2');
const dotenv = require('dotenv').config();
const client = new aws.EC2Client({
  region: process.env.AWS_REGION,
});

const ec2Commands = {};

ec2Commands.stopInstance = async (instanceIds) => {
  const command = new aws.StopInstancesCommand({
    InstanceIds: instanceIds,
    Hibernate: false,
    DryRun: false,
    Force: false,
  });

  const stopResponse = await client.send(command);
  return stopResponse;
};

ec2Commands.startInstance = async (instanceIds) => {
  try {
    const startCommand = new aws.StartInstancesCommand({
      InstanceIds: instanceIds,
      DryRun: false,
    });

    const startResponse = await client.send(startCommand);
    return startResponse;
  } catch (e) {
    console.log(e);
    return;
  }
};

ec2Commands.getInstanceDetails = async () => {
  const instanceDescriptionCommand = new aws.DescribeInstancesCommand({
    DryRun: false,
  });
  const instanceDescriptionResponse = await client.send(
    instanceDescriptionCommand
  );

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

  return {
    status: instanceDescriptionResponse.$metadata.httpStatusCode,
    instanceList: instanceList,
  };
};

module.exports = ec2Commands;
