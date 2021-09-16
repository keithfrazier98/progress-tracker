import React from 'react';
import ReactDOM from 'react-dom';
//import TrackerContainer from '@keithers98/react-progress-tracker/dist/TrackerContainer';
import TrackerContainer from "./TrackerContainer";
import trackerData from "./trackerData.json"

ReactDOM.render(
  <React.StrictMode>
    <TrackerContainer uponGoalComplete={(tracker)=>{console.log("callback",tracker)}}/>
  </React.StrictMode>,
  document.getElementById('progressTracker')
);


