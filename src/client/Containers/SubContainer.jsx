import React from 'react'

import InstanceBar from '../Components/InstanceBar.jsx';
import PageContainer from './PageContainer.jsx';

// SubContainer renders from MainContainer
const SubContainer = () => {
  return (
    <div>
      <div>SubContainer</div>
      <InstanceBar />
      <PageContainer />
    </div>
  )
}

export default SubContainer