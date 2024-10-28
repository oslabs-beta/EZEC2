import { DnsNameState } from '@aws-sdk/client-ec2';
import React from 'react';

import UsageMetricsLineChart from './UsageMetricsLineChart';

// InstanceCard renders from InstanceContainer
const InstanceCard = ({ instanceId, name }) => {
  console.log('instance card id: ', instanceId);
  return (
    <div className='min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800'>
      <p className='mb-4 font-semibold text-gray-800 dark:text-gray-300'>
        {/* {title} */}
      </p>
      <h3>{name}</h3>
      <h3>{instanceId}</h3>
      <h4>CPU Utilization</h4>
      <UsageMetricsLineChart instanceId={instanceId} />
    </div>
  );
};

export default InstanceCard;
