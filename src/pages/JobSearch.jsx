import React, { useEffect, useState, useRef } from 'react';
import JobList from '../components/JobList.jsx';

const JobSearch = () => {

return (
	<div
    style={{
      display: 'flex',
      justifyContent: 'centre',
      alignItems: 'centre',
      height: '100vh'
    }}
	>
	<JobList/>
	</div>
);
};

export default JobSearch;
