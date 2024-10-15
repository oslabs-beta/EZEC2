const aws = require('@aws-sdk/client-cloudwatch');

const cloudwatchController = {};

cloudwatchController.getUsageData = async (req, res, next) => {
  console.log(
    'Querying Cloudwatch for usage data on instance ' + req.params.instanceId
  );
  const now = new Date(Date.now());
  const yesterday = new Date(Date.now() - 1000 * 60 * 60 * 24);
  const instanceId = req.params.instanceId;

  try {
    const client = new aws.CloudWatchClient({ region: 'us-east-1' });
    const input = {
      // GetMetricDataInput
      MetricDataQueries: [
        {
          Id: 'cpuUsage', // required
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'CPUUtilization',
              Dimensions: [
                {
                  Name: 'InstanceId', // required "InstanceId"
                  Value: instanceId, // required
                },
              ],
            },
            Period: 300, // required
            Stat: 'Average', // required
            Unit: 'Percent',
          },
          //   Expression: 'STRING_VALUE',
          //   Label: 'STRING_VALUE',
          ReturnData: true,
          //   Period: 300,
          //   AccountId: 'STRING_VALUE',
        },
      ],
      StartTime: yesterday, // required
      EndTime: now, // required
      //   NextToken: 'STRING_VALUE',
      ScanBy: 'TimestampAscending',
      //   MaxDatapoints: Number('int'),
      //   LabelOptions: {
      //     // LabelOptions
      //     Timezone: 'Timezone Label Option',
      //   },
    };
    const command = new aws.GetMetricDataCommand(input);

    const response = await client.send(command);
    console.log(response);
    res.locals = response;
    return next();
  } catch (e) {
    console.log(e);
    return next({
      status: 401,
      message: { err: e.toString() },
    });
  }
};

module.exports = cloudwatchController;
