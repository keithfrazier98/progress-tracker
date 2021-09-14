"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _react = _interopRequireDefault(require("react"));

var _ProgressBar = _interopRequireDefault(require("./ProgressBar"));

var _reactBeautifulDnd = require("react-beautiful-dnd");

require("./styles/Trackers.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function Trackers(_ref) {
  let {
    newTracker,
    editMode,
    data,
    setData,
    dataChange,
    setDataChange,
    editTracker
  } = _ref;

  const placeholderTracker = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
    key: "title",
    index: 0,
    draggableId: "title",
    isDragDisabled: !editMode
  }, provided => /*#__PURE__*/_react.default.createElement("li", _extends({
    id: "title",
    key: "title"
  }, provided.draggableProps, provided.dragHandleProps, {
    ref: provided.innerRef
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "cancelBox",
    style: {
      height: "300px"
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "tracker",
    style: {
      display: "flex"
    }
  }, /*#__PURE__*/_react.default.createElement("h4", {
    style: {
      alignSelf: "center"
    }
  }, "Click ", /*#__PURE__*/_react.default.createElement("ion-icon", {
    name: "add-circle-outline"
  }), " to create a new tracker!"))))));

  function displayTimerUnits(units, index) {
    return editMode ? /*#__PURE__*/_react.default.createElement("select", {
      name: "units",
      onChange: editTracker,
      id: index,
      "data-current": units,
      value: units
    }, /*#__PURE__*/_react.default.createElement("option", null, "min"), /*#__PURE__*/_react.default.createElement("option", null, "hr")) : /*#__PURE__*/_react.default.createElement("p", {
      id: units,
      "data-units": units
    }, "/", units);
  }

  function displayTimerGoal(goal) {
    return goal > 3599 ? goal / 3600 : goal / 60;
  }

  function deleteTracker(event) {
    const index = event.target.id;
    const newValue = Array.from(data);
    newValue.splice(index, 1);
    setData(newValue);
    setDataChange(!dataChange);
  }

  function manualReset(event) {
    const index = event.target.parentNode.id;
    const newValue = data[index];
    newValue["current"] = 0;
    newValue["completed"] = false;
    const newData = Array.from(data);
    newData.splice(index, 1, newValue);
    setData(newData);
    setDataChange(!dataChange);
  } // edit tracker button opens tracker input options for all trackers
  // optional fields have down arrows where menus are available
  // text info are switched to text fields


  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, data.length > 0 || newTracker ? data.map((_ref2, index) => {
    let {
      title,
      goal,
      occurence,
      type,
      current,
      units,
      completed
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_reactBeautifulDnd.Draggable, {
      key: title,
      index: index,
      draggableId: title,
      isDragDisabled: !editMode
    }, provided => /*#__PURE__*/_react.default.createElement("li", _extends({
      id: title,
      key: title
    }, provided.draggableProps, provided.dragHandleProps, {
      ref: provided.innerRef
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "cancelBox"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "tracker"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "flex-container info"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "flex-container",
      id: "tracker:".concat(index)
    }, editMode ? /*#__PURE__*/_react.default.createElement("label", {
      htmlFor: "title:".concat(index)
    }, /*#__PURE__*/_react.default.createElement("input", {
      id: index,
      name: "title:".concat(index),
      key: "title",
      placeholder: "Tracker Title",
      maxLength: "15",
      size: "10",
      value: title,
      onChange: editTracker
    })) : /*#__PURE__*/_react.default.createElement("h4", {
      id: "title"
    }, title), /*#__PURE__*/_react.default.createElement("p", null, ":"), editMode ? /*#__PURE__*/_react.default.createElement("input", {
      id: index,
      name: "goal",
      placeholder: "Goal",
      maxLength: "4",
      size: "2",
      value: type === "Timer" ? displayTimerGoal(goal) : goal,
      onChange: editTracker
    }) : /*#__PURE__*/_react.default.createElement("p", {
      id: "goal"
    }, type === "Timer" ? displayTimerGoal(goal) : goal), type === "Timer" ? displayTimerUnits(units, index) : null), editMode ? /*#__PURE__*/_react.default.createElement("select", {
      style: {
        height: "24px"
      },
      id: index,
      name: "occurence",
      value: occurence,
      onChange: editTracker
    }, /*#__PURE__*/_react.default.createElement("option", null, "Daily"), /*#__PURE__*/_react.default.createElement("option", null, "Weekly"), /*#__PURE__*/_react.default.createElement("option", null, "Monthly"), /*#__PURE__*/_react.default.createElement("option", null, "Yearly"), /*#__PURE__*/_react.default.createElement("option", null, "Manual")) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      id: "occurence"
    }, occurence === "Manual" ? /*#__PURE__*/_react.default.createElement("button", {
      id: index,
      name: "reset",
      onClick: manualReset,
      style: {
        fontSize: "20px"
      }
    }, /*#__PURE__*/_react.default.createElement("ion-icon", {
      name: "refresh-outline"
    })) : occurence))), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
      current: current,
      goal: goal,
      type: type,
      index: index,
      setData: setData,
      data: data,
      editMode: editMode,
      editTracker: editTracker,
      occurence: occurence,
      setDataChange: setDataChange,
      dataChange: dataChange,
      newTracker: newTracker,
      completed: completed
    })), editMode ? /*#__PURE__*/_react.default.createElement("div", {
      style: {
        alignContent: "center",
        display: "flex",
        padding: "50px 0 50px 0"
      }
    }, /*#__PURE__*/_react.default.createElement("button", {
      id: index,
      role: "button",
      onClick: deleteTracker
    }, /*#__PURE__*/_react.default.createElement("ion-icon", {
      name: "close-circle-outline"
    }))) : null)));
  }) : placeholderTracker);
}

var _default = Trackers;
exports.default = _default;