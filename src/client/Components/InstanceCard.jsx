import { DnsNameState } from '@aws-sdk/client-ec2';
import React from 'react';

import UsageMetricsLineChart from './UsageMetricsLineChart';

// InstanceCard renders from InstanceContainer
const InstanceCard = ({ instanceId, name }) => {
  return (
    <div>
      <h3>{name}</h3>
      <h3>{instanceId}</h3>
      <h4>CPU Utilization</h4>
      <UsageMetricsLineChart instanceId={instanceId} />
    </div>
  );
};

export default InstanceCard;
