import React from 'react';

import UsageMetricsLineChart from '../Components/UsageMetricsLineChart.jsx';
import SubContainer from './SubContainer.jsx';
import InstanceBar from '../Components/InstanceBar.jsx';

// search bar
// sub container

// MainContainer renders from App
const MainContainer = () => {
  return (
    <div id='MainContainer' className='flex h-screen bg-templateGray-50 dark:bg-templateGray-900 false' >
      <InstanceBar />
      <SubContainer />
      {/* <UsageMetricsLineChart /> */}
    </div>
  );
};

export default MainContainer;
