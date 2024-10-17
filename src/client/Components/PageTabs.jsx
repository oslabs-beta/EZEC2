import React from 'react';
import { Link } from 'react-router-dom';

// PageTabs renders from PageContainer
const PageTabs = () => {
  // remove instance metrics Link in the future. Only here for development purposes
  return (
    <div>
      <Link to='/overview/management'>Overview: Management</Link>
      <Link to='/overview/metrics'>Overview: Metrics</Link>
      {/* <Link to='/instance/usage-metrics'>Dev Tab: Instance Metrics</Link> */}
    </div>
  );
};

export default PageTabs;
