import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { Draggable } from "react-beautiful-dnd";
import "./Trackers.css";

function Trackers({
  setNewTracker,
  newTracker,
  editMode,
  setEditMode,
  createTracker,
  trackerFormData,
  setTrackerFormData,
  data,
  setData,
  dataChange,
  setDataChange,
  trackers,
  setTrackers,
}) {
  // new tracker button opens tracker form
  // tracker form looks like a tracker and is placed in above other trackers
  // when form is submitted it is placed in the tracker list and trackers are rerendered
  const trackerForm = () => {
    const { title, goal, current, occurence, type } = trackerFormData;
    return (
      <li>
        <div className="tracker">
          <form>
            <div className="flex-container info">
              <div className="flex-container">
                <input
                  id={0}
                  name="title"
                  placeholder="Tracker Title"
                  maxLength="20"
                  size={"10"}
                  value={title}
                  onChange={editTracker}
                ></input>
                <p>:</p>
                <input
                  id={0}
                  name="goal"
                  placeholder="Goal"
                  maxLength="4"
                  size={"4"}
                  value={goal}
                  onChange={editTracker}
                ></input>
              </div>
              <select
                style={{ height: "24px" }}
                id={0}
                name="occurence"
                value={occurence}
                onChange={editTracker}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Yearly</option>
                <option>Manual</option>
              </select>
            </div>
            <ProgressBar
              current={current}
              goal={goal}
              type={type}
              index={null}
              setData={setData}
              data={data}
              editMode={editMode}
              editTracker={editTracker}
              occurence={occurence}
              setDataChange={setDataChange}
              dataChange={dataChange}
            />
          </form>
        </div>
      </li>
    );
  };

  function displayTimerUnits(goal) {
    if (goal > 3599) {
      return <p>/hr</p>;
    } else {
      return <p>/min</p>;
    }
  }

  function displayTimerGoal(goal) {
    if (goal > 3600) {
      return goal / 3600;
    } else {
      return goal / 60;
    }
  }

  function deleteTracker(event) {
    const index = event.target.id;
    const items = Array.from(data);
    items.splice(index, 1);
    setData(items);
    setDataChange(!dataChange);
  }

  // edit tracker button opens tracker input options for all trackers
  // optional fields have down arrows where menus are available
  // text info are switched to text fields
  const listItem = ({ title, goal, occurence, type, current, index }) => (
    <div className="cancelBox">
      <div className="tracker">
        <div className="flex-container info">
          <div className="flex-container">
            {editMode ? (
              <input
                id={index}
                name="title"
                placeholder="Tracker Title"
                maxLength="15"
                size={"10"}
                value={title}
                onChange={editTracker}
              ></input>
            ) : (
              <h4>{title}</h4>
            )}
            <p>:</p>
            {editMode ? (
              <input
                id={index}
                name="goal"
                placeholder="Goal"
                maxLength="4"
                size={"3"}
                value={type === "Timer" ? displayTimerGoal(goal) : goal}
                onChange={editTracker}
              ></input>
            ) : (
              <p>{type === "Timer" ? displayTimerGoal(goal) : goal}</p>
            )}
            {type === "Timer" ? displayTimerUnits(goal) : null}
          </div>
          {editMode ? (
            <select
              style={{ height: "24px" }}
              id={index}
              name="occurence"
              value={occurence}
              onChange={editTracker}
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Yearly</option>
              <option>Manual</option>
            </select>
          ) : (
            <>
              <span>
                {occurence === "Manual" ? (
                  <button style={{ fontSize: "20px" }}>
                    <ion-icon name="refresh-outline"></ion-icon>
                  </button>
                ) : (
                  occurence
                )}
              </span>
            </>
          )}
        </div>
        <ProgressBar
          current={current}
          goal={goal}
          type={type}
          index={index}
          setData={setData}
          data={data}
          editMode={editMode}
          editTracker={editTracker}
          occurence={occurence}
          setDataChange={setDataChange}
          dataChange={dataChange}
          newTracker={newTracker}
        />
      </div>
      {editMode ? (
        <div
          style={{
            alignContent: "center",
            display: "flex",
            padding: "50px 0 50px 0",
          }}
        >
          <button id={index} role="button" onClick={deleteTracker}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </button>
        </div>
      ) : null}
    </div>
  );
  useEffect(() => {
    const existingTrackers = data.map(
      ({ title, goal, occurence, type, current }, index) => {
        let li;
        
        editMode
          ? (li = (
              <Draggable key={title} index={index} draggableId={title}>
                {(provided) => (
                  <li
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {listItem({ title, goal, occurence, type, current, index })}
                  </li>
                )}
              </Draggable>
            ))
          : (li = (
              <li>
                {listItem({ title, goal, occurence, type, current, index })}
              </li>
            ));

        return li;
      }
    );

    if (newTracker) {
      setTrackers([trackerForm(), ...existingTrackers]);
    } else {
      setTrackers(existingTrackers);
    }
  }, [dataChange, editMode, newTracker, trackerFormData]);

  function editTracker(event) {
    const index = event.target.id;
    const name = event.target.name;
    const value = event.target.value;

    if (newTracker) {
      setTrackerFormData({
        ...trackerFormData,
        [name]: value,
      });
    } else {
      const newValue = data[index];
      newValue[name] = value;
      const newData = data;
      newData.splice(index, 1, newValue);
      setData(newData);
      setDataChange(!dataChange);
    }
  }

  return <>{trackers}</>;
}

export default Trackers;
