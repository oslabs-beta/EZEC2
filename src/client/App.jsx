import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import { MainContainer } from './Containers/MainContainer.jsx';

export const InstanceContext = React.createContext();

// App renders from index.js
export const App = () => {
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
    if (instanceDetails === null) fetchDetails();
  }, [instanceDetails]);


  console.log(instanceDetails)
  return (
    <QueryClientProvider client={queryClient}>
      <InstanceContext.Provider value={{ fetchDetails, instanceDetails, setInstanceDetails }}>
        <MainContainer />
      </InstanceContext.Provider>
    </QueryClientProvider>
  );
};
