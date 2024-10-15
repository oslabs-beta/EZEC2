import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import MainContainer from './Containers/MainContainer.jsx';

// App renders from index.js
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainContainer />
    </QueryClientProvider>
  );
};

export default App;
