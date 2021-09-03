import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
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
  setData
}) {
  const [dataChange, setDataChange] = useState(false);
  const [trackers, setTrackers] = useState();

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

  useEffect(() => {
    const existingTrackers = data.map((element, index) => {
      const { title, goal, occurence, type, current } = element;
      return (
        <li>
          <div className="tracker">
            <div className="flex-container info">
              <div className="flex-container">
                {editMode ? (
                  <input
                    id={index}
                    name="title"
                    placeholder="Tracker Title"
                    maxLength="20"
                    size={title ? title.length : "20"}
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
                    size={"4"}
                    value={goal}
                    onChange={editTracker}
                  ></input>
                ) : (
                  <p>{goal}</p>
                )}
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
                  <span>{occurence}</span>
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
        </li>
      );
    });

    if (newTracker) {
      setTrackers([trackerForm(), ...existingTrackers]);
    } else {
      setTrackers(existingTrackers);
    }
  }, [dataChange, editMode, newTracker, trackerFormData]);

  // new tracker button opens tracker form
  // tracker form looks like a tracker and is placed in above other trackers
  // when form is submitted it is placed in the tracker list and trackers are rerendered

  // edit tracker button opens tracker input options for all trackers
  // optional fields have down arrows where menus are available
  // text info are switched to text fields

  function editTracker(event) {
    const index = event.target.id;
    const name = event.target.name;
    const value = event.target.value;

    if (newTracker) {
      setTrackerFormData({
        ...trackerFormData,
        [name]: value,
      });
      console.log("editing");
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
