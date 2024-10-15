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
  // temporary tertiary for development. Do not want a hardcoded instance id in the final product
  let instanceIdParameter = !instanceId ? '' : instanceId;

  const { isPending, error, data } = useQuery({
    queryKey: ['metricData'],
    queryFn: () =>
      fetch('/cloudwatch/getUsageData/' + instanceIdParameter).then((res) =>
        res.json()
      ),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  timeData = data.MetricDataResults[0].Timestamps.map((timestamp) => {
    console.log(new Date(timestamp).toTimeString().split(' (')[0]);
    return new Date(timestamp).toTimeString().split(' (')[0].split(' ')[0];
  });
  metricsData = data.MetricDataResults[0].Values;
  console.log(data.MetricDataResults[0].Timestamps);
  console.log(metricsData);

  return (
    <div>
      <LineChart
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
    </div>
  );
};

export default UsageMetricsLineChart;
