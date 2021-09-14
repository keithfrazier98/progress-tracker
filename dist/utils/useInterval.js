"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useInterval;

var _react = require("react");

// This custom hook is from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = (0, _react.useRef)(); // Remember the latest callback.

  (0, _react.useEffect)(() => {
    savedCallback.current = callback;
  }, [callback]); // Set up the interval.

  (0, _react.useEffect)(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}