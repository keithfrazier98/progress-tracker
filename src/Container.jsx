import React, { useState } from "react";
import Trackers from "./Trackers";
import "./Container.css";
import trackerData from "./trackerData.json";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Container() {
  const [newTracker, setNewTracker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const initalTrackerData = {
    title: "",
    goal: "",
    current: 0,
    occurence: "manual",
    type: "Incremental",
  };
  const [trackerFormData, setTrackerFormData] = useState(initalTrackerData);
  const [data, setData] = useState(trackerData);
  const [dataChange, setDataChange] = useState(false);
  const [trackers, setTrackers] = useState();

  function toggleNewTracker() {
    setNewTracker(true);
  }

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function createTracker() {
    let error;

    if (!trackerFormData.title) {
      error = true;
      window.alert("New tracker needs a title");
    } else if (!trackerFormData.goal || Number(trackerFormData.goal) === 0) {
      error = true;
      window.alert("New tracker needs a goal");
    }

    for (let tracker of data) {
      if (tracker.title === trackerFormData.title) {
        error = true;
        window.alert("New tracker needs a unique title.");
      }
    }
    if (!error) {
      let newData = data;
      newData.splice(0, 0, trackerFormData);
      setData(newData);
      setNewTracker(false);
      setTrackerFormData(initalTrackerData);
    }
  }

  function cancelNewTracker() {
    setNewTracker(false);
    setTrackerFormData(initalTrackerData);
  }

  function reorderList(result) {
    if (!result.destination) return;
    const items = Array.from(data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData(items);
    setDataChange(!dataChange);
  }

  const trackerElement = (
    <>
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
        dataChange={dataChange}
        setDataChange={setDataChange}
        trackers={trackers}
        setTrackers={setTrackers}
      />
    </>
  );

  return (
    <div className="container">
      <div className="buttons">
        <button
          id="add"
          onClick={newTracker ? createTracker : toggleNewTracker}
          disabled={editMode}
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
        <DragDropContext onDragEnd={reorderList}>
          <Droppable droppableId={"trackers"}>
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {trackerElement}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  );
}

export default Container;
