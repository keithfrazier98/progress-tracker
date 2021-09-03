import React, { useState } from "react";
import Trackers from "./Trackers";
import "./Container.css";
import trackerData from "./trackerData.json";

function Container() {
  const [newTracker, setNewTracker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const initalTrackerData = {
    title: "",
    goal: null,
    current: null,
    occurence: "manual",
    type: "Incremental",
  };
  const [trackerFormData, setTrackerFormData] = useState(initalTrackerData);
  const [data, setData] = useState(trackerData);

  

  function toggleNewTracker() {
    setNewTracker(true);
  }

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function createTracker() {
      let newData = data
      newData.splice(0,0,trackerFormData)
      setData(newData)
      setNewTracker(false)
  }

  function cancelNewTracker() {
    setNewTracker(false);
    setTrackerFormData(initalTrackerData);
  }

  return (
    <div className="container">
      <div className="buttons">
        <button
          id="add"
          onClick={newTracker ? createTracker : toggleNewTracker}
        >
          {newTracker ? (
            <ion-icon name="checkmark-outline"></ion-icon>
          ) : (
            <ion-icon name="add-circle-outline"></ion-icon>
          )}
        </button>
        <button
          id="edit"
          onClick={newTracker ? cancelNewTracker : toggleEditMode}
        >
          {editMode ? (
            <ion-icon name="checkmark-outline"></ion-icon>
          ) : newTracker ? (
            <ion-icon name="close-outline"></ion-icon>
          ) : (
            <ion-icon name="reorder-two-outline"></ion-icon>
          )}
        </button>
      </div>
      <ul>
        <Trackers
          newTracker={newTracker}
          setNewTracker={setNewTracker}
          editMode={editMode}
          setEditMode={setEditMode}
          createTracker={createTracker}
          trackerFormData={trackerFormData}
          setTrackerFormData={setTrackerFormData}
          trackerData={trackerData}
          data={data}
          setData={setData}
        />
      </ul>
    </div>
  );
}

export default Container;
