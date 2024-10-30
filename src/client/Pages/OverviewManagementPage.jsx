import React from 'react';
import { useState, useEffect, useContext } from 'react';

import OverviewManagement from '../Components/OverviewManagement';
import Tables from '../Components/Tables';
import { InstanceContext } from '../App';

// OverviewManagementPage renders from PageContainer
const OverviewManagementPage = () => {
  const { fetchDetails, instanceDetails, setInstanceDetails } =
    useContext(InstanceContext);

  return (
    <>
      <h1 className='my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 px-6'>
        Control Panel
      </h1>
      <div className='flex px-6 flex-col overflow-auto'>
        <OverviewManagement />
        {instanceDetails && <Tables instanceList={instanceDetails} />}
      </div>
    </>
  );
};

export default OverviewManagementPage;
