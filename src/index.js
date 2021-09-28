import React from "react";
import ReactDOM from "react-dom";
//import TrackerContainer from "./TrackerContainer";
import TrackerContainer from "@keithers98/react-progress-tracker/dist/TrackerContainer"

ReactDOM.render(
  <React.StrictMode>
    <TrackerContainer />
  </React.StrictMode>,
  document.getElementById("progressTracker")
);
