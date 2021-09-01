import React from "react";
import ProgressBar from "./ProgressBar";
import "./Trackers.css";

function Trackers(data = []) {
  data = [
    { title: "Apply to jobs", goal: 5, current:0, occurence: "daily", type: "inc" },
    { title: "Cold-Outreach", goal: 2, current:183766, occurence: "daily", type: "time" },
    { title: "Apply to jobs", goal: 5, current:0, occurence: "daily", type: "inc" },
    { title: "Cold-Outreach", goal: 1, current:0, occurence: "daily", type: "time" },
  ];

  const trackers = [];
  data.forEach((element) => {
    const { title, goal, occurence, type, current } = element;
    trackers.push(
      <li>
        <div className="tracker">
          <div className="flex-container info">
            <div className="flex-container">
              <h4>{title}:</h4>
              <p>{goal}</p>
            </div>
            <p>{occurence}</p>
          </div>
          <ProgressBar current={current} goal={goal} type={type} />
        </div>
      </li>
    );
  });

  return <>{trackers}</>;
}

export default Trackers;
