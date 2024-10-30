import React from 'react';

import OverviewMetrics from '../Components/OverviewMetrics';
import InstanceContainer from '../Containers/InstanceContainer';

// OverviewMetricsPage renders from PageContainer
const OverviewMetricsPage = () => {
  return (
    <div className='h-full overflow-y-auto'>
      <h1 className='my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 px-6'>
        Metrics Overview
      </h1>
      <OverviewMetrics />
      <InstanceContainer />
    </div>
  );
};

export default OverviewMetricsPage;
