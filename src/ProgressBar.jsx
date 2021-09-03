import React, { useState } from "react";
import useInterval from "./utils/useInterval";
import "./ProgressBar.css";

function ProgressBar({
  current,
  type,
  index,
  setData,
  data,
  editMode,
  editTracker,
  goal,
  setDataChange,
  dataChange,
  newTracker,
}) {
  const [running, setRunning] = useState(false);

  function handleStart(event) {
    setRunning(!running);
  }

  useInterval(
    () => {
      handleIncDec();
    },
    running ? 1000 : null
  );

  function handleIncDec(event) {
    setData(() => {
      let newData = [];
      data.forEach((object, i) => {
        if (i != index) {
          newData.push(object);
        } else {
          newData.push({
            ...object,
            current: event
              ? event.target.parentNode.id === "dec"
                ? current - 1
                : current + 1
              : current + 1,
          });
        }
      });
      return newData;
    });

    setDataChange(!dataChange);
  }

  let buttons;

  switch (type) {
    case "Incremental":
      buttons = (
        <div>
          <div className="buttonDiv">
            <button disabled = {newTracker} onClick={handleIncDec} id="dec">
              <ion-icon name="remove-outline"></ion-icon>
            </button>
            <span style={{ fontSize: "30px" }}>{current}</span>
            <button disabled = {newTracker} onClick={handleIncDec} id="inc">
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </div>
        </div>
      );
      break;
    case "Timer":
      let decimalHours = current / 3600;
      let hours = Math.trunc(decimalHours);
      let remainingSeconds = current - Math.trunc(decimalHours) * 3600;
      let remainingMinutes = remainingSeconds / 60;
      let minutes = Math.trunc(remainingMinutes);
      let seconds = remainingSeconds - Math.trunc(minutes) * 60;

      if (minutes < 10) {
        minutes = `0${minutes}`;
      }

      if (seconds < 10) {
        seconds = `0${seconds}`;
      }

      if (hours < 10) {
        hours = `0${hours}`;
      }

      let timeString = `${hours}:${minutes}:${seconds}`;

      buttons = (
        <div>
          <div className="buttonDiv">
            <button disabled = {newTracker} onClick={handleStart} id="incTime">
              {running ? (
                <ion-icon name="pause-outline"></ion-icon>
              ) : (
                <ion-icon name="play-outline"></ion-icon>
              )}
            </button>
            <span style={{ fontSize: "30px" }}>{timeString}</span>
          </div>
        </div>
      );
      break;
  }

  const calculatePercent = () => {
    let percent;

    if (type === "Incremental") {
      percent = (current / goal) * 100;
    } else {
      percent = Math.trunc((current / (goal * 3600)) * 100);
    }

    return percent;
  };

  return (
    <div className="progressContainer">
      {buttons}
      <div className="bar">
        {editMode || index===null? (
          <select
            style={{ height: "24px" , width:"100%"}}
            id={index}
            name="type"
            value={type}
            onChange={editTracker}
            
          >
            <option>Incremental</option>
            <option>Timer</option>
          </select>
        ) : (
          <>
            <div
              className="progress"
              style={{ width: `${calculatePercent()}%` }}
            ></div>
            <span>{calculatePercent()}%</span>
          </>
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
