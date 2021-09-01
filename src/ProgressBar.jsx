import React, { useState } from "react";
import "./ProgressBar.css";

function ProgressBar({ current, goal, type }) {
  const [running, setRunning] = useState(false);

  let buttons;

  switch (type) {
    case "inc":
      buttons = (
        <div>
          <div className="buttonDiv">
            <button>
              <ion-icon name="remove-outline"></ion-icon>
            </button>
            <span style={{ fontSize: "30px" }}>{current}</span>
            <button>
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </div>
        </div>
      );
      break;
    case "time":
      const timeFormat = /\d\d:\d\d:\d\d/;

      //current = 3766
      let decimalHours = current / 3600;
      let hours = Math.trunc(decimalHours);
      let remainingSeconds = current - Math.trunc(decimalHours) * 3600;
      let remainingMinutes = remainingSeconds / 60;
      let minutes = Math.trunc(remainingMinutes);
      let seconds = remainingSeconds - Math.trunc(minutes) * 60;

      if (minutes < 10){
          minutes = `0${minutes}`
      }

      if(seconds < 10){
          seconds = `0${seconds}`
      }

      if(hours < 10){
          hours = `0${hours}`
      }


      let timeString = `${hours}:${minutes}:${seconds}`

      console.log(hours, minutes, seconds);
      buttons = (
        <div>
          <div className="buttonDiv">
            <button>
              {running ? (
                <ion-icon name="pause-outline"></ion-icon>
              ) : (
                <ion-icon name="play-outline"></ion-icon>
              )}
            </button>
            <span
              style={{ fontSize: "30px" }}
            >{timeString}</span>
          </div>
        </div>
      );
      break;
  }

  return (
    <div className="progressContainer">
      {buttons}
      <div className="bar">
        <div className="progress"></div>
      </div>
    </div>
  );
}

export default ProgressBar;
