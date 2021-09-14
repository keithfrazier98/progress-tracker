"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _useInterval = _interopRequireDefault(require("./utils/useInterval"));

require("./styles/ProgressBar.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function ProgressBar(_ref) {
  let {
    current,
    type,
    index,
    setData,
    data,
    editMode,
    editTracker,
    goal,
    setDataChange,
    dataChange,
    newTracker,
    completed
  } = _ref;
  const [running, setRunning] = (0, _react.useState)(false);

  function handleStart(event) {
    setRunning(!running);
  }

  (0, _useInterval.default)(() => {
    handleIncDec();
  }, running ? 1000 : null);

  function handleIncDec(event) {
    let setCompleted;
    let call;
    if (current === 0 && call === "dec") return;
    if (current === goal && call === "inc") return;

    if (event) {
      call = event.target.parentNode.id;
      event.target.parentNode.id === "inc" && goal == current + 1 ? setCompleted = true : setCompleted = false;
    }

    if (!event && goal === current + 1) {
      setRunning(false);
      setCompleted = true;
    }

    setData(() => {
      let newData = [];
      data.forEach((object, i) => {
        if (i != index) {
          newData.push(object);
        } else {
          newData.push(_objectSpread(_objectSpread({}, object), {}, {
            current: event ? event.target.parentNode.id === "dec" ? current - 1 : current + 1 : current + 1,
            completed: setCompleted
          }));
        }
      });
      return newData;
    });
    setDataChange(!dataChange);
  }

  let buttons;

  switch (type) {
    case "Incremental":
      buttons = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "buttonDiv",
        id: "IncrementalBtns"
      }, /*#__PURE__*/_react.default.createElement("button", {
        disabled: newTracker || completed || editMode,
        onClick: handleIncDec,
        id: "dec"
      }, /*#__PURE__*/_react.default.createElement("ion-icon", {
        name: "remove-outline"
      })), completed ? /*#__PURE__*/_react.default.createElement("p", {
        id: "iCompleted"
      }, "Completed!") : /*#__PURE__*/_react.default.createElement("span", {
        id: "current",
        style: {
          fontSize: "30px"
        }
      }, current), /*#__PURE__*/_react.default.createElement("button", {
        disabled: newTracker || completed || editMode,
        onClick: handleIncDec,
        id: "inc"
      }, /*#__PURE__*/_react.default.createElement("ion-icon", {
        name: "add-outline"
      }))));
      break;

    case "Timer":
      let decimalHours = current / 3600;
      let hours = Math.trunc(decimalHours);
      let remainingSeconds = current - Math.trunc(decimalHours) * 3600;
      let remainingMinutes = remainingSeconds / 60;
      let minutes = Math.trunc(remainingMinutes);
      let seconds = remainingSeconds - Math.trunc(minutes) * 60;

      if (minutes < 10) {
        minutes = "0".concat(minutes);
      }

      if (seconds < 10) {
        seconds = "0".concat(seconds);
      }

      if (hours < 10) {
        hours = "0".concat(hours);
      }

      let timeString = "".concat(hours, ":").concat(minutes, ":").concat(seconds);
      buttons = /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
        className: "buttonDiv",
        id: "TimerBtns"
      }, /*#__PURE__*/_react.default.createElement("button", {
        disabled: newTracker || completed || editMode,
        onClick: handleStart,
        id: "incTime"
      }, running ? /*#__PURE__*/_react.default.createElement("ion-icon", {
        name: "pause-outline"
      }) : /*#__PURE__*/_react.default.createElement("ion-icon", {
        name: "play-outline"
      })), completed ? /*#__PURE__*/_react.default.createElement("p", {
        id: "tCompleted",
        style: {
          alignSelf: "center"
        }
      }, "Completed!") : /*#__PURE__*/_react.default.createElement("span", {
        style: {
          fontSize: "30px"
        }
      }, timeString)));
      break;
  }

  const calculatePercent = () => {
    return Math.trunc(current / goal * 100);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "progressContainer"
  }, buttons, /*#__PURE__*/_react.default.createElement("div", {
    className: "bar"
  }, editMode || index === null ? /*#__PURE__*/_react.default.createElement("select", {
    style: {
      height: "24px",
      width: "100%"
    },
    id: index,
    name: "type",
    value: type,
    onChange: editTracker
  }, /*#__PURE__*/_react.default.createElement("option", null, "Incremental"), /*#__PURE__*/_react.default.createElement("option", null, "Timer")) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "progress",
    style: {
      width: "".concat(calculatePercent(), "%"),
      zIndex: 1,
      display: "flex",
      justifyContent: "end"
    }
  }, /*#__PURE__*/_react.default.createElement("span", {
    style: {
      zIndex: 2,
      overflow: "hidden",
      color: "white"
    }
  }, calculatePercent(), "%")))));
}

var _default = ProgressBar;
exports.default = _default;