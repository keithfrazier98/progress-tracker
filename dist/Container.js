"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _Trackers = _interopRequireDefault(require("./Trackers"));

var _TrackerForm = _interopRequireDefault(require("./TrackerForm"));

require("./styles/Container.css");

var _reactBeautifulDnd = require("react-beautiful-dnd");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const schedule = require("node-schedule");

function Container() {
  const [newTracker, setNewTracker] = (0, _react.useState)(false);
  const [editMode, setEditMode] = (0, _react.useState)(false);
  const initalTrackerData = {
    title: "",
    goal: "",
    current: 0,
    occurence: "Manual",
    type: "Incremental",
    units: "hr"
  };
  const [trackerFormData, setTrackerFormData] = (0, _react.useState)(initalTrackerData);
  const [data, setData] = (0, _react.useState)([]);
  const [dataChange, setDataChange] = (0, _react.useState)(false);
  const [titleIndex, setTitleIndex] = (0, _react.useState)(null);

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
      setTrackerFormData(_objectSpread(_objectSpread({}, trackerFormData), {}, {
        [name]: value
      }));
      name === "title" ? setTitleIndex("0") : setTitleIndex(null);
    } else {
      if (name === "goal" && newValue["type"] === "Timer") {
        if (event.target.parentNode.querySelector("[name=units]").dataset.current === "hr") {
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

  function createResetTrackerJobs() {
    // filter through data on every render and create schedules for each tracker depending on the occurence
    const dailyTackers = [];
    const weeklyTrackers = [];
    const monthlyTackers = [];
    const yearlyTrackers = [];
    data.forEach((trackerData, index) => {
      switch (trackerData.occurence) {
        case "Daily":
          dailyTackers.push(index);
          break;

        case "Weekly":
          weeklyTrackers.push(index);
          break;

        case "Monthly":
          monthlyTackers.push(index);
          break;

        case "Yearly":
          yearlyTrackers.push(index);
          break;
      }
    });

    function resetTrackers(trackerList) {
      const updatedTrackers = {};
      const newData = data;
      trackerList.forEach(trackerIndex => {
        updatedTrackers[trackerIndex] = _objectSpread(_objectSpread({}, data[trackerIndex]), {}, {
          ["current"]: 0
        });
      });

      for (const [index, udpatedTracker] of Object.entries(updatedTrackers)) {
        newData.splice(index, 1, udpatedTracker);
      }

      setData(newData);
    }

    const dailyJobs = schedule.scheduleJob("1 0 0 * * *", () => {
      resetTrackers(dailyTackers);
    });
    const weeklyJobs = schedule.scheduleJob("1 0 0 * * 0", () => {
      resetTrackers(weeklyTrackers);
    });
    const monthlyJobs = schedule.scheduleJob("1 0 0 1 * *", () => {
      resetTrackers(monthlyTackers);
    });
    const yearlyJobs = schedule.scheduleJob("1 0 0 * 1 *", () => {
      resetTrackers(yearlyTrackers);
    });
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

    let newData = data;

    if (!error) {
      const {
        goal,
        type,
        units
      } = trackerFormData;

      if (type === "Timer") {
        if (units === "hr") {
          newData.splice(0, 0, _objectSpread(_objectSpread({}, trackerFormData), {}, {
            ["goal"]: goal * 3600
          }));
        } else {
          newData.splice(0, 0, _objectSpread(_objectSpread({}, trackerFormData), {}, {
            ["goal"]: goal * 60
          }));
        }
      } else {
        newData.splice(0, 0, _objectSpread({}, trackerFormData));
      }

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

  const trackerElement = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Trackers.default, {
    newTracker: newTracker,
    editMode: editMode,
    data: data,
    setData: setData,
    dataChange: dataChange,
    setDataChange: setDataChange,
    editTracker: editTracker
  }));

  (0, _react.useEffect)(() => {
    if (data.length > 0) createResetTrackerJobs(); // workaround for unfocus input bug
    //this conditional will keep the proper input field focused upon rerender

    if (editMode && titleIndex != null || newTracker && titleIndex != null) {
      document.getElementById("tracker:".concat(titleIndex)).firstChild.firstChild.focus();
      setTitleIndex(null);
    }
  }, [dataChange, trackerFormData]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "container",
    id: "trackerContainer"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "buttons"
  }, /*#__PURE__*/_react.default.createElement("button", {
    id: "add",
    onClick: newTracker ? createTracker : toggleNewTracker,
    disabled: editMode
  }, newTracker ? /*#__PURE__*/_react.default.createElement("ion-icon", {
    name: "checkmark-outline"
  }) : /*#__PURE__*/_react.default.createElement("ion-icon", {
    name: "add-circle-outline"
  })), /*#__PURE__*/_react.default.createElement("button", {
    id: "edit",
    onClick: newTracker ? cancelNewTracker : toggleEditMode
  }, editMode ? /*#__PURE__*/_react.default.createElement("ion-icon", {
    name: "checkmark-outline"
  }) : newTracker ? /*#__PURE__*/_react.default.createElement("ion-icon", {
    name: "close-outline"
  }) : /*#__PURE__*/_react.default.createElement("ion-icon", {
    name: "reorder-two-outline"
  }))), /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.DragDropContext, {
    onDragEnd: reorderList
  }, /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Droppable, {
    droppableId: "trackers"
  }, provided => /*#__PURE__*/_react.default.createElement("ul", _extends({}, provided.droppableProps, {
    ref: provided.innerRef
  }), newTracker ? /*#__PURE__*/_react.default.createElement(_TrackerForm.default, {
    trackerFormData: trackerFormData,
    editTracker: editTracker,
    setData: setData,
    data: data,
    editMode: editMode,
    dataChange: dataChange,
    setDataChange: setDataChange
  }) : null, trackerElement, provided.placeholder))));
}

var _default = Container;
exports.default = _default;