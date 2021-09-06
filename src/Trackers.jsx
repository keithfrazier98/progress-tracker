import React, { useEffect, useRef } from "react";
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
  //const inputEl = useRef(null);
  function editTracker(event) {
    const index = event.target.id;
    let name = event.target.name;
    if (name.includes('title')) {
      name = name.split("");
      name.splice(name.length - 2, 2);
      name = name.join("");
    }
    console.log(name);
    const value = event.target.value;
    const newValue = data[index];

    if (newTracker) {
      setTrackerFormData({
        ...trackerFormData,
        [name]: value,
      });
    } else {
      name === "goal" && newValue["type"] === "Timer"
        ? event.target.parentNode.querySelector("[name=units]").dataset
            .current === "hr"
          ? (newValue[name] = value * 3600)
          : (newValue[name] = value * 60)
        : (newValue[name] = value);

      if (name === "type") newValue["goal"] = 0;

      const newData = data;
      newData.splice(index, 1, newValue);
      setData(newData);
      setDataChange(!dataChange);
      //inputEl.current.focus();
      //console.log(inputEl.current);
    }
  }
  // new tracker button opens tracker form
  // tracker form looks like a tracker and is placed in above other trackers
  // when form is submitted it is placed in the tracker list and trackers are rerendered

  function displayTimerUnits(units, index) {
    return editMode ? (
      <select
        name="units"
        onChange={editTracker}
        id={index}
        data-current={units}
        value={units}
      >
        <option>min</option>
        <option>hr</option>
      </select>
    ) : (
      <p id={units} data-units={units}>
        /{units}
      </p>
    );
  }

  function displayTimerGoal(goal) {
    return goal > 3599 ? goal / 3600 : goal / 60;
  }

  function deleteTracker(event) {
    const index = event.target.id;
    const items = Array.from(data);
    items.splice(index, 1);
    setData(items);
    setDataChange(!dataChange);
  }

  const trackerForm = () => {
    const { title, goal, current, occurence, type } = trackerFormData;
    return (
      <li key={title}>
        <div className="tracker">
          <form>
            <div className="flex-container info">
              <div className="flex-container">
                <label htmlFor={`title`}>
                  <input
                    name="title"
                    placeholder="Tracker Title"
                    maxLength="20"
                    size={"10"}
                    value={title}
                    onChange={editTracker}
                    required
                  ></input>
                </label>

                <p>:</p>
                <input
                  name="goal"
                  placeholder="Goal"
                  maxLength="4"
                  size={"4"}
                  value={goal}
                  onChange={editTracker}
                  required
                ></input>
              </div>
              <select
                style={{ height: "24px" }}
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

  // edit tracker button opens tracker input options for all trackers
  // optional fields have down arrows where menus are available
  // text info are switched to text fields
  const listItem = ({
    title,
    goal,
    occurence,
    type,
    current,
    index,
    units,
    completed,
  }) => (
    <div className="cancelBox">
      <div className="tracker">
        <div className="flex-container info">
          <div className="flex-container">
            {editMode ? (
              <label htmlFor={`title:${index}`}>
                <input
                  id={index}
                  name={`title:${index}`}
                  placeholder="Tracker Title"
                  maxLength="15"
                  size={"10"}
                  value={title}
                  onChange={editTracker}
                  // ref={inputEl}
                ></input>
              </label>
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
            {type === "Timer" ? displayTimerUnits(units, index) : null}
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
          completed={completed}
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

  function renderTrackers() {
    const existingTrackers = data.map(
      ({ title, goal, occurence, type, current, units, completed }, index) => (
        <Draggable
          key={title}
          index={index}
          draggableId={title}
          isDragDisabled={!editMode}
        >
          {(provided) => (
            <li
              key={title}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {listItem({
                title,
                goal,
                occurence,
                type,
                current,
                index,
                units,
                completed,
              })}
            </li>
          )}
        </Draggable>
      )
    );

    if (newTracker) {
      setTrackers([trackerForm(), ...existingTrackers]);
    } else {
      setTrackers(existingTrackers);
    }

    return trackers;
  }

  useEffect(() => {
    const existingTrackers = data.map(
      ({ title, goal, occurence, type, current, units, completed }, index) => (
        <Draggable
          key={title}
          index={index}
          draggableId={title}
          isDragDisabled={!editMode}
        >
          {(provided) => (
            <li
              key={title}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {listItem({
                title,
                goal,
                occurence,
                type,
                current,
                index,
                units,
                completed,
              })}
            </li>
          )}
        </Draggable>
      )
    );

    if (newTracker) {
      setTrackers([trackerForm(), ...existingTrackers]);
    } else {
      setTrackers(existingTrackers);
    }
  }, [dataChange, editMode, newTracker, trackerFormData]);

  return <>{trackers}</>;
}

export default Trackers;
