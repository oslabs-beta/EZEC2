import React from 'react';

import SideBarContent from './SideBarContent';

// SideBar renders from Main Container
const SideBar = () => {


  return (
    <aside className='z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-white dark:bg-templateGray-800 lg:block'>
      <SideBarContent />
    </aside>
  );
};

export default SideBar;
