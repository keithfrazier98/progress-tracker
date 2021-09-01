import React from "react";
import Trackers from "./Trackers";
import "./Container.css";

function Container() {
  return (
    <div className="container">
      <div className="buttons">
        <button id="add">
          <ion-icon name="add-circle-outline"></ion-icon>
        </button>
        <button id="edit">
        <ion-icon name="reorder-two-outline"></ion-icon>
        </button>
      </div>
      <ul>
        <Trackers />
      </ul>
    </div>
  );
}

export default Container;
