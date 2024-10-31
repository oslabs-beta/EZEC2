import React from 'react';
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';
import { useQuery } from '@tanstack/react-query';

const colors = [
  '#4e79a7',
  '#f28e2c',
  '#e15759',
  '#76b7b2',
  '#59a14f',
  '#edc949',
  '#af7aa1',
  '#ff9da7',
  '#9c755f',
  '#bab0ab',
];

//configuration object for the different metrics
const metricConfigs = {
  cpuUsage: {
    label: 'CPU Utilization',
    valueFormatter: (v) => v + '%',
    max: 100,
  },
  cpuCreditBalance: {
    label: 'CPU Credit Balance',
    valueFormatter: (v) => v.toFixed(2),
  },
  cpuCreditUsage: {
    label: 'CPU Credit Usage',
    valueFormatter: (v) => v.toFixed(2),
  },
  memoryUsage: {
    label: 'Memory Usage',
    valueFormatter: (v) => v + '%',
    max: 100,
  },
  networkIn: {
    label: 'Network In',
    valueFormatter: (v) => (v / 1024 / 1024).toFixed(2) + ' MB',
  },
  networkOut: {
    label: 'Network Out',
    valueFormatter: (v) => (v / 1024 / 1024).toFixed(2) + ' MB',
  },
  diskReadOps: {
    label: 'Disk Read Operations',
    valueFormatter: (v) => v.toFixed(0),
  },
  diskWriteOps: {
    label: 'Disk Write Operations',
    valueFormatter: (v) => v.toFixed(0),
  },
};

//takes EC2 instance
const UsageMetricsLineChart = ({ instanceId }) => {
  let metricsData;
  let timeData;
  console.log('UsageMetricsLineChart', instanceId);
  //React query is used to handle api call fetched from cloudwatchendpoint
  const { isPending, error, data } = useQuery({
    queryKey: ['metricData' + instanceId],
    queryFn: async () => {
      return await fetch('/cloudwatch/getUsageData/' + instanceId).then((res) =>
        res.json()
      );
    },
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  const charts = [];

  // Process each metric result
  data.MetricDataResults.forEach((metricResult, index) => {
    const config = metricConfigs[metricResult.Id];
    if (!config) return;

    timeData = metricResult.Timestamps.map((timestamp) => {
      return new Date(timestamp).toTimeString().split(' (')[0].split(' ')[0];
    });

    metricsData = metricResult.Values;

    charts.push(
      <div key={metricResult.Id} className='mb-6'>
        <LineChart
          className='bg-opacity-70 bg-white rounded-md'
          height={300}
          series={[
            {
              data: metricsData,
              label: config.label,
              color: colors[index % colors.length],
            },
          ]}
          yAxis={[
            {
              max: config.max,
              valueFormatter: config.valueFormatter,
            },
          ]}
          xAxis={[{ scaleType: 'point', data: timeData, tickNumber: 10 }]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              strokeWidth: 2,
            },
            [`& .${markElementClasses.root}`]: {
              scale: '0.6',
              fill: '#fff',
              strokeWidth: 2,
            },
          }}
        />
      </div>
    );
  });

  return <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>{charts}</div>;
};

export default UsageMetricsLineChart;
