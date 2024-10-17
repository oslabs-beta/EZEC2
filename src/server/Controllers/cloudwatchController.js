const aws = require('@aws-sdk/client-cloudwatch');
const { fromSSO } = require('@aws-sdk/credential-provider-sso');

const cloudwatchController = {};

cloudwatchController.getUsageData = async (req, res, next) => {
  console.log(
    'Querying Cloudwatch for usage data on instance ' + req.params.instanceId
  );
  const now = new Date(Date.now());
  const yesterday = new Date(Date.now() - 1000 * 60 * 60 * 24);
  const instanceId = req.params.instanceId;

  try {
    const client = new aws.CloudWatchClient({
      region: 'us-east-1',
      credentials: fromSSO({ profile: 'ec2-manager-908027414612' }),
    });
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
                  Name: 'InstanceId', // required
                  Value: instanceId, // required
                },
              ],
            },
            Period: 900, // required
            Stat: 'Average', // required
            Unit: 'Percent',
          },
          ReturnData: true,
        },
      ],
      StartTime: yesterday, // required
      EndTime: now, // required
      ScanBy: 'TimestampAscending',
      // MaxDatapoints: Number('int'),
    };
    const command = new aws.GetMetricDataCommand(input);

    const response = await client.send(command);
    // console.log(response);
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
