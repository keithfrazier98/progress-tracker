import React from "react";
import ProgressBar from "./ProgressBar";

function TrackerForm({
  trackerFormData,
  editTracker,
  setData,
  data,
  editMode,
  dataChange,
  setDataChange,
}) {
  const { title, goal, current, occurence, type } = trackerFormData;
  return (
    <li key={title}>
      <div className="tracker">
        <form>
          <div className="flex-container info">
            <div className="flex-container">
              <label htmlFor={`title`}>
                <input
                  name={`title:0`}
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
}

export default TrackerForm;
