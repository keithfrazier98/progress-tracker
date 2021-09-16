import React from "react";
import ProgressBar from "./ProgressBar";
import "./utils/styles.css"

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
    <li className="tkrLi" key={title}>
      <div className="tracker">
        <form>
          <div className="tkr-flex-container tkrInfo">
            <div className="tkr-flex-container" id="tracker:0">
              <label htmlFor={`title`}>
                <input
                className="tkrInput tkrInputStyle"
                  name={`title:0`}
                  placeholder="Tracker Title"
                  maxLength="20"
                  size={"10"}
                  value={title}
                  onChange={editTracker}
                  required
                ></input>
              </label>

              <p className="tkrPfont tkrPmargin">:</p>
              <input
                              className="tkrInput tkrInputStyle"

                name="goal"
                placeholder="Goal"
                maxLength="4"
                size={"2"}
                value={goal}
                onChange={editTracker}
                required
              ></input>
              {type === "Timer" ? (
                <select className="tkrSelectFont tkrSelectAlign tkrSelectStyle"
                  name="units"
                  onChange={editTracker}
                  id="0"
                  data-current={units}
                  value={units}
                >
                  <option className="tkrOptionAlign">min</option>
                  <option className="tkrOptionAlign">hr</option>
                </select >
              ) : null}
            </div>
            <select className="tkrSelectFont tkrSelectAlign tkrSelectStyle"
              style={{ height: "24px" }}
              name="occurence"
              value={occurence}
              onChange={editTracker}
            >
              <option className="tkrOptionAlign">Manual</option>
            </select>
          </div>
          <ProgressBar
            tracker = {{title: "",
            goal: goal,
            current: current,
            occurence: occurence,
            type: type,
            units: "hr"}}
            index={null}
            setData={setData}
            data={data}
            editMode={editMode}
            editTracker={editTracker}
            setDataChange={setDataChange}
            dataChange={dataChange}
          />
        </form>
      </div>
    </li>
  );
}

export default TrackerForm;
