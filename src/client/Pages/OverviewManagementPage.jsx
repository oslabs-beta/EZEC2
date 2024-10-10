import React from 'react';

import OverviewManagement from '../Components/OverviewManagement';
import InstanceContainer from '../Containers/InstanceContainer';

// OverviewManagementPage renders from PageContainer
const OverviewManagementPage = () => {
  return (
    <div>
      <div>Overview Management Page</div>
      <OverviewManagement />
      <InstanceContainer />
    </div>
  );
};

export default OverviewManagementPage;
