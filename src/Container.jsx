import React, { useState } from "react";
import Trackers from "./Trackers";
import TrackerForm from "./TrackerForm";
import "./Container.css";
import trackerData from "./trackerData.json";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";

function Container() {
  const [newTracker, setNewTracker] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const initalTrackerData = {
    title: "",
    goal: "",
    current: 0,
    occurence: "Manual",
    type: "Incremental",
  };
  const [trackerFormData, setTrackerFormData] = useState(initalTrackerData);
  const [data, setData] = useState(trackerData);
  const [dataChange, setDataChange] = useState(false);
  const [titleIndex, setTitleIndex] = useState(null);

  function editTracker(event) {
    const index = event.target.id;
    let name = event.target.name;
    if (name.includes("title")) {
      name = name.split("");
      name.splice(name.length - 2, 2);
      name = name.join("");
    }
    const value = event.target.value;
    const newValue = data[index];

    if (newTracker) {
      setTrackerFormData({
        ...trackerFormData,
        [name]: value,
      });
      name === "title" ? setTitleIndex("0") : setTitleIndex(null);
      console.log(name);
    } else {
      if (name === "goal" && newValue["type"] === "Timer") {
        if (
          event.target.parentNode.querySelector("[name=units]").dataset
            .current === "hr"
        ) {
          newValue[name] = value * 3600;
        } else {
          newValue[name] = value * 60;
        }
      } else {
        newValue[name] = value;
      }

      if (name === "type") newValue["goal"] = 0;
      name === "title" ? setTitleIndex(index) : setTitleIndex(null);

      const newData = data;
      newData.splice(index, 1, newValue);
      setData(newData);
      setDataChange(!dataChange);
    }
  }

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
        editMode={editMode}
        data={data}
        setData={setData}
        dataChange={dataChange}
        setDataChange={setDataChange}
        editTracker={editTracker}
      />
    </>
  );

  useEffect(() => {
    console.log(titleIndex);
    console.log(editMode, newTracker, titleIndex);
    if (
      (editMode && titleIndex != null) ||
      (newTracker && titleIndex != null)
    ) {
      // workaround for unfocus input bug
      document
        .getElementById(`tracker:${titleIndex}`)
        .firstChild.firstChild.focus();
      setTitleIndex(null);
    }
  }, [dataChange, trackerFormData]);

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
              {newTracker ? (
                <TrackerForm
                  trackerFormData={trackerFormData}
                  editTracker={editTracker}
                  setData={setData}
                  data={data}
                  editMode={editMode}
                  dataChange={dataChange}
                  setDataChange={setDataChange}
                />
              ) : null}
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
