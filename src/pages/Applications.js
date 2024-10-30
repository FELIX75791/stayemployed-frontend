import React from 'react';
import TrackApplications from '../components/TrackApplication';

const Applications = () => {
return (
	<div
    style={{
      display: 'flex',
      justifyContent: 'centre',
      alignItems: 'centre',
      height: '100vh'
    }}
	>
  <TrackApplications/>
	</div>
);
};

export default Applications;
