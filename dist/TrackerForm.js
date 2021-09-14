"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _ProgressBar = _interopRequireDefault(require("./ProgressBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function TrackerForm(_ref) {
  let {
    trackerFormData,
    editTracker,
    setData,
    data,
    editMode,
    dataChange,
    setDataChange
  } = _ref;
  const {
    title,
    goal,
    current,
    occurence,
    type,
    units
  } = trackerFormData;
  return /*#__PURE__*/_react.default.createElement("li", {
    key: title
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "tracker"
  }, /*#__PURE__*/_react.default.createElement("form", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex-container info"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex-container",
    id: "tracker:0"
  }, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "title"
  }, /*#__PURE__*/_react.default.createElement("input", {
    name: "title:0",
    placeholder: "Tracker Title",
    maxLength: "20",
    size: "10",
    value: title,
    onChange: editTracker,
    required: true
  })), /*#__PURE__*/_react.default.createElement("p", null, ":"), /*#__PURE__*/_react.default.createElement("input", {
    name: "goal",
    placeholder: "Goal",
    maxLength: "4",
    size: "2",
    value: goal,
    onChange: editTracker,
    required: true
  }), type === "Timer" ? /*#__PURE__*/_react.default.createElement("select", {
    name: "units",
    onChange: editTracker,
    id: "0",
    "data-current": units,
    value: units
  }, /*#__PURE__*/_react.default.createElement("option", null, "min"), /*#__PURE__*/_react.default.createElement("option", null, "hr")) : null), /*#__PURE__*/_react.default.createElement("select", {
    style: {
      height: "24px"
    },
    name: "occurence",
    value: occurence,
    onChange: editTracker
  }, /*#__PURE__*/_react.default.createElement("option", null, "Daily"), /*#__PURE__*/_react.default.createElement("option", null, "Weekly"), /*#__PURE__*/_react.default.createElement("option", null, "Monthly"), /*#__PURE__*/_react.default.createElement("option", null, "Yearly"), /*#__PURE__*/_react.default.createElement("option", null, "Manual"))), /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
    current: current,
    goal: goal,
    type: type,
    index: null,
    setData: setData,
    data: data,
    editMode: editMode,
    editTracker: editTracker,
    occurence: occurence,
    setDataChange: setDataChange,
    dataChange: dataChange
  }))));
}

var _default = TrackerForm;
exports.default = _default;