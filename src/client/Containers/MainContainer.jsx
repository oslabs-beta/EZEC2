import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import UsageMetricsLineChart from '../Components/UsageMetricsLineChart.jsx';
import SubContainer from './SubContainer.jsx';
import SideBar from '../Components/SideBar.jsx';
import MobileSidebar from '../Components/MobileSidebar.jsx';

export const SidebarContext = React.createContext();
export const SearchBarContext = React.createContext();

// MainContainer renders from App
export const MainContainer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');

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
        <SearchBarContext.Provider value={{search, setSearch}}>
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
        </SearchBarContext.Provider>
      </div>
    </BrowserRouter>
  );
};
