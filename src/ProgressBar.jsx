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
  completed,
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
    let setCompleted;
    let call;

    if (current === 0 && call === "dec") return;
    if (current === goal && call === "inc") return;

    if (event) {
      call = event.target.parentNode.id;
      console.log(call, goal, current, current + 1)
      event.target.parentNode.id === "inc" && goal == current + 1
        ? (setCompleted = true)
        : (setCompleted = false);
    }

    console.log(setCompleted, completed)
    
    if (!event && goal === current + 1) {
      setRunning(false)
      setCompleted = true
    }
    
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
            completed: setCompleted,
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
          <div className="buttonDiv" id="IncrementalBtns">
            <button disabled={newTracker || completed} onClick={handleIncDec} id="dec">
              <ion-icon name="remove-outline"></ion-icon>
            </button>
            {completed ? (
              <p id="completed">Completed!</p>
            ) : (
              <span id="current" style={{ fontSize: "30px" }}>{current}</span>
            )}
            <button disabled={newTracker || completed} onClick={handleIncDec} id="inc">
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
          <div className="buttonDiv" id="TimerBtns">
            <button disabled={newTracker || completed} onClick={handleStart} id="incTime">
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
    return Math.trunc((current / goal) * 100);
  };

  return (
    <div className="progressContainer">
      {buttons}
      <div className="bar">
        {editMode || index === null ? (
          <select
            style={{ height: "24px", width: "100%" }}
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
              style={{
                width: `${calculatePercent()}%`,
                zIndex: 1,
                display:"flex",
                justifyContent:"end"
              }}
            >
              <span style={{ zIndex: 2, overflow:"hidden", color:"white"}}>
                {calculatePercent()}%
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
