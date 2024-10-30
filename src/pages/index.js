import React from 'react';
import DashBoard from '../components/DashBoard';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'centre',
        alignItems: 'centre',
        height: '100vh'
      }}
    >
      <DashBoard userId={1}/>
    </div>
  );
};

export default Home;