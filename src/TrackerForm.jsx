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
  const { title, goal, current, occurence, type, units } = trackerFormData;
  return (
    <li key={title}>
      <div className="tracker">
        <form>
          <div className="flex-container info">
            <div className="flex-container" id="tracker:0">
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
                size={"2"}
                value={goal}
                onChange={editTracker}
                required
              ></input>
              {type === "Timer" ? (
                <select
                  name="units"
                  onChange={editTracker}
                  id="0"
                  data-current={units}
                  value={units}
                >
                  <option>min</option>
                  <option>hr</option>
                </select>
              ) : null}
            </div>
            <select
              style={{ height: "24px" }}
              name="occurence"
              value={occurence}
              onChange={editTracker}
            >
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
