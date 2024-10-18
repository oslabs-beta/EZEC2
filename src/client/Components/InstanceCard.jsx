import { DnsNameState } from '@aws-sdk/client-ec2';
import React from 'react';

import UsageMetricsLineChart from './UsageMetricsLineChart';

// InstanceCard renders from InstanceContainer
const InstanceCard = ({ instanceId, name, chartColor }) => {
  console.log('instance card id: ', instanceId);
  return (
    <div className='min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
      <p className='mb-4 font-semibold text-gray-800 dark:text-gray-300'>
        Instance Name: {name}
      </p>
      <p className='mb-4 font-semibold text-gray-800 dark:text-gray-300'>
        Instance ID: {instanceId}
      </p>
      <UsageMetricsLineChart instanceId={instanceId} chartColor={chartColor} />
    </div>
  );
};

export default InstanceCard;
