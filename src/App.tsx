import React, { useEffect } from 'react';
import Cashclocks from './components/Cashclocks';
import Stats from './components/Overview';
import useOverviewStore from './store/overviewStore';

const App: React.FC = () => {
  const { resetStop } = useOverviewStore();
  
  useEffect(() => {
    resetStop();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='background m-0 w-full h-full'>
      <div className='mt-5'>
        <Stats />
        <Cashclocks />
      </div>
    </div>
  );
};

export default App;
