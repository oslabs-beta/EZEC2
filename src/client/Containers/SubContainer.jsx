import React from 'react';

import PageContainer from './PageContainer.jsx';
import SearchBar from '../Components/SearchBar.jsx';

// SubContainer renders from MainContainer
const SubContainer = () => {
  return (
    <div id='SubContainer' className='flex flex-col flex-1 w-full'>
      <SearchBar />
      <PageContainer />
    </div>
  );
};

export default SubContainer;
