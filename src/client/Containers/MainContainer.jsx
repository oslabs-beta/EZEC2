import React from 'react';
import UsageMetricsLineChart from '../Components/UsageMetricsLineChart.jsx';
import SearchBar from '../Components/SearchBar.jsx';
import SubContainer from './SubContainer.jsx';

// search bar
// sub container

// MainContainer renders from App
const MainContainer = () => {
  return (
    <div>
      <div>MainContainer</div>
      <SearchBar />
      <SubContainer />
      <UsageMetricsLineChart />
    </div>
  );
};

export default MainContainer;
