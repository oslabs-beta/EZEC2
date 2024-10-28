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
      credentials: fromSSO({ profile: 'ezec2' }),
    });
    //find schema
    const input = {
      // GetMetricDataInput
      MetricDataQueries: [
        // CPU Utilization
        {
          Id: 'cpuUsage',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'CPUUtilization',
              Dimensions: [
                {
                  Name: 'InstanceId',
                  Value: instanceId,
                },
              ],
            },
            Period: 900,
            Stat: 'Average',
            Unit: 'Percent',
          },
          ReturnData: true,
        },
        // CPU Credit Balance
        {
          Id: 'cpuCreditBalance',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'CPUCreditBalance',
              Dimensions: [
                {
                  Name: 'InstanceId',
                  Value: instanceId,
                },
              ],
            },
            Period: 900,
            Stat: 'Average',
          },
          ReturnData: true,
        },
        // CPU Credit Usage
        {
          Id: 'cpuCreditUsage',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'CPUCreditUsage',
              Dimensions: [
                {
                  Name: 'InstanceId',
                  Value: instanceId,
                },
              ],
            },
            Period: 900,
            Stat: 'Average',
          },
          ReturnData: true,
        },
        // Memory Usage
        {
          Id: 'memoryUsage',
          MetricStat: {
            Metric: {
              Namespace: 'CWAgent',
              MetricName: 'mem_used_percent',
              Dimensions: [
                {
                  Name: 'InstanceId',
                  Value: instanceId,
                },
              ],
            },
            Period: 900,
            Stat: 'Average',
            Unit: 'Percent',
          },
          ReturnData: true,
        },
        // Network In
        {
          Id: 'networkIn',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'NetworkIn',
              Dimensions: [
                {
                  Name: 'InstanceId',
                  Value: instanceId,
                },
              ],
            },
            Period: 900,
            Stat: 'Average',
            Unit: 'Bytes',
          },
          ReturnData: true,
        },
        // Network Out
        {
          Id: 'networkOut',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'NetworkOut',
              Dimensions: [
                {
                  Name: 'InstanceId',
                  Value: instanceId,
                },
              ],
            },
            Period: 900,
            Stat: 'Average',
            Unit: 'Bytes',
          },
          ReturnData: true,
        },
        
        // Disk Read Operations
        {
          Id: 'diskReadOps',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'DiskReadOps',
              Dimensions: [
                {
                  Name: 'InstanceId',
                  Value: instanceId,
                },
              ],
            },
            Period: 900,
            Stat: 'Sum',
          },
          ReturnData: true,
        },
        // Disk Write Operations
        {
          Id: 'diskWriteOps',
          MetricStat: {
            Metric: {
              Namespace: 'AWS/EC2',
              MetricName: 'DiskWriteOps',
              Dimensions: [
                {
                  Name: 'InstanceId',
                  Value: instanceId,
                },
              ],
            },
            Period: 900,
            Stat: 'Sum',
          },
          // {
          //   "view": "timeSeries",
          //   "stat": "Average",
          //   "period": 300,
          //   "stacked": false,
          //   "yAxis": {
          //       "left": {
          //           "min": 0
          //       }
          //   },
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
