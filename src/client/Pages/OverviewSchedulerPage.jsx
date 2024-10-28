import React from 'react';
import { useState, useEffect } from 'react';

import OverviewManagement from '../Components/OverviewManagement';
import ScheduleTable from '../Components/ScheduleTable';

// OverViewSchedulerPage renders from PageContainer
const OverViewSchedulerPage = () => {
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
    <div>
      <div>Scheduler</div>
      {instanceDetails && <ScheduleTable instanceList={instanceDetails} />}
    </div>
  );
};

export default OverViewSchedulerPage;
