import React, { useEffect } from 'react';
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';
import { useQuery } from '@tanstack/react-query';

// InstanceBar renders from SubContainer
const UsageMetricsLineChart = ({ instanceId }) => {
  let metricsData;
  let timeData;
  // variable for dev only. instanceId should be populated via prop and used to retrieve usage data
  console.log('UsageMetricsLineChart', instanceId);

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

  timeData = data.MetricDataResults[0].Timestamps.map((timestamp) => {
    // console.log(new Date(timestamp).toTimeString().split(' (')[0]);
    return new Date(timestamp).toTimeString().split(' (')[0].split(' ')[0];
  });
  metricsData = data.MetricDataResults[0].Values;
  // console.log(data.MetricDataResults[0].Timestamps);
  // console.log(metricsData);

  return (
    <LineChart
      className='bg-opacity-70 bg-white rounded-md'
      width={500}
      height={300}
      series={[
        {
          data: metricsData,
          label: 'CPU Utilization',
        },
      ]}
      yAxis={[{ max: 100, valueFormatter: (v) => v + '%' }]}
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
  );
};

export default UsageMetricsLineChart;
