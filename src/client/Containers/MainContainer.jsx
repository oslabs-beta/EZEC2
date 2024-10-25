import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import UsageMetricsLineChart from '../Components/UsageMetricsLineChart.jsx';
import SubContainer from './SubContainer.jsx';
import SideBar from '../Components/SideBar.jsx';
import MobileSidebar from '../Components/MobileSidebar.jsx';

export const SidebarContext = React.createContext();

// MainContainer renders from App
export const MainContainer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <BrowserRouter>
      <div
        id='MainContainer'
        className='flex h-screen bg-templateGray-50 dark:bg-templateGray-900 false'
      >
        <SidebarContext.Provider
          value={{
            isSidebarOpen,
            toggleSidebar,
            closeSidebar,
          }}
        >
          <SideBar />
          <MobileSidebar />
          <SubContainer />
        </SidebarContext.Provider>
      </div>
    </BrowserRouter>
  );
};
