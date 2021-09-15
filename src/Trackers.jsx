import React from "react";
import ProgressBar from "./ProgressBar";
import { Draggable } from "react-beautiful-dnd";
import "./styles/Trackers.css";

function Trackers({
  newTracker,
  editMode,
  data,
  setData,
  dataChange,
  setDataChange,
  editTracker,
}) {
  const placeholderTracker = (
    <>
      <Draggable
        key={"title"}
        index={0}
        draggableId={"title"}
        isDragDisabled={!editMode}
      >
        {(provided) => (
          <li
            id={"title"}
            key={"title"}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="cancelBox" style={{height:"300px"}}>
              <div className="tracker" style={{display:"flex"}}>
                    <h4 style={{alignSelf:"center"}}>
                      Click <ion-icon name="add-circle-outline"></ion-icon> to
                      create a new tracker!
                    </h4>
              </div>
            </div>
          </li>
        )}
      </Draggable>
    </>
  );

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
    const newValue = Array.from(data);
    newValue.splice(index, 1);
    setData(newValue);
    setDataChange(!dataChange);
  }

  function manualReset(event) {
    const index = event.target.parentNode.id;
    const newValue = data[index];
    newValue["current"] = 0;
    newValue["completed"] = false;
    const newData = Array.from(data);
    newData.splice(index, 1, newValue);
    setData(newData);
    setDataChange(!dataChange);
  }
  // edit tracker button opens tracker input options for all trackers
  // optional fields have down arrows where menus are available
  // text info are switched to text fields

  return (
    <>
      {data.length > 0 || newTracker
        ? data.map(
            (
              { title, goal, occurence, type, current, units, completed },
              index
            ) => (
              <Draggable
                key={title}
                index={index}
                draggableId={title}
                isDragDisabled={!editMode}
              >
                {(provided) => (
                  <li
                    id={title}
                    key={title}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <div className="cancelBox">
                      <div className="tracker">
                        <div className="flex-container info">
                          <div
                            className="flex-container"
                            id={`tracker:${index}`}
                          >
                            {editMode ? (
                              <label htmlFor={`title:${index}`}>
                                <input
                                  id={index}
                                  name={`title:${index}`}
                                  key={`title`}
                                  placeholder="Tracker Title"
                                  maxLength="15"
                                  size={"10"}
                                  value={title}
                                  onChange={editTracker}
                                ></input>
                              </label>
                            ) : (
                              <h4 id="title">{title}</h4>
                            )}
                            <p>:</p>
                            {editMode ? (
                              <input
                                id={index}
                                name="goal"
                                placeholder="Goal"
                                maxLength="4"
                                size={"2"}
                                value={
                                  type === "Timer"
                                    ? displayTimerGoal(goal)
                                    : goal
                                }
                                onChange={editTracker}
                              ></input>
                            ) : (
                              <p id="goal">
                                {type === "Timer"
                                  ? displayTimerGoal(goal)
                                  : goal}
                              </p>
                            )}
                            {type === "Timer"
                              ? displayTimerUnits(units, index)
                              : null}
                          </div>
                              <span id="occurence">
                                {occurence === "Manual" ? (
                                  <button
                                    id={index}
                                    name="reset"
                                    onClick={manualReset}
                                    style={{ fontSize: "20px" }}
                                  >
                                    <ion-icon name="refresh-outline"></ion-icon>
                                  </button>
                                ) : (
                                  occurence
                                )}
                              </span>
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
                          <button
                            id={index}
                            role="button"
                            onClick={deleteTracker}
                          >
                            <ion-icon name="close-circle-outline"></ion-icon>
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </li>
                )}
              </Draggable>
            )
          )
        : placeholderTracker}
    </>
  );
}

export default Trackers;
