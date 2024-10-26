import React from 'react';
import { useState, useEffect } from 'react';

import OverviewManagement from '../Components/OverviewManagement';
import Tables from '../Components/Tables';

// OverviewManagementPage renders from PageContainer
const OverviewManagementPage = () => {
  let [instanceDetails, setInstanceDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await fetch('/ec2/getInstanceDetails');
      const data = await response.json();
      setInstanceDetails(data.instanceList);
    } catch (e) {
      console.log('Error fetching instance details: ', e);
    }
  };

  useEffect(() => {
    if (!instanceDetails) fetchDetails();
  }, [instanceDetails]);
  return (
    <>
    <h1 className='my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200 px-6'>
        Control Panel
      </h1>
    <div className='flex px-6 flex-col'>
      <OverviewManagement />
      {instanceDetails && <Tables instanceList={instanceDetails} />}
    </div>
    </>
  );
};

export default OverviewManagementPage;
