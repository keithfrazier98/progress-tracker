import React from "react";
import Trackers from "./Trackers";
import "./Container.css";

function Container() {
  return (
    <div className="container"> 
      <ul>
        <Trackers />
      </ul>
    </div>
  );
}

export default Container;
