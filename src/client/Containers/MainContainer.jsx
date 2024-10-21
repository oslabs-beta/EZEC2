import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import UsageMetricsLineChart from '../Components/UsageMetricsLineChart.jsx';
import SubContainer from './SubContainer.jsx';
import InstanceBar from '../Components/InstanceBar.jsx';

// search bar
// sub container

// MainContainer renders from App
const MainContainer = () => {
  return (
    <BrowserRouter>
      <div
        id='MainContainer'
        className='flex h-screen bg-templateGray-50 dark:bg-templateGray-900 false'
      >
        <InstanceBar />
        <SubContainer />
        {/* <UsageMetricsLineChart /> */}
      </div>
    </BrowserRouter>
  );
};

export default MainContainer;
