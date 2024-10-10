import React from 'react';

import OverviewMetrics from '../Components/OverviewMetrics';
import InstanceContainer from '../Containers/InstanceContainer';

// OverviewMetricsPage renders from PageContainer
const OverviewMetricsPage = () => {
  return (
    <div>
      <div>Overview Metrics Page</div>
      <OverviewMetrics />
      <InstanceContainer />
    </div>
  );
};

export default OverviewMetricsPage;
