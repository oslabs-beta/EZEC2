import React from 'react';
import { Routes, Route } from 'react-router-dom';
// set up react routing

import PageTabs from '../Components/PageTabs';
import OverviewMetricsPage from '../Pages/OverviewMetricsPage';
import OverviewManagementPage from '../Pages/OverviewManagementPage';
import InstanceMetricsPage from '../Pages/InstanceMetricsPage';

// tabs
// different pages

// PageContainer renders from SubContainer
const PageContainer = () => {
  return (
    <>
      {/* <PageTabs /> */}
      <Routes>
        <Route path='/' element={<OverviewMetricsPage />}></Route>
        <Route
          path='/overview/management'
          element={<OverviewManagementPage />}
        ></Route>
        <Route
          path='/overview/metrics'
          element={<OverviewMetricsPage />}
        ></Route>
        <Route
          path='/instance/usage-metrics'
          element={<InstanceMetricsPage />}
        ></Route>
      </Routes>
    </>
  );
};

export default PageContainer;
