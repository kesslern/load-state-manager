"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadStateManager = LoadStateManager;
exports.useLoadState = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var context = _react.default.createContext(null);

var LoadStateProvider = context.Provider;

var useLoadState = function useLoadState(key) {
  var state = (0, _react.useContext)(context);
  console.log('in hook: ' + JSON.stringify(state.state));
  return {
    current: state.state[key],
    toggle: function toggle() {
      return state.toggle(key);
    }
  };
};

exports.useLoadState = useLoadState;

function reducer(state, action) {
  switch (action.type) {
    case 'toggle':
      var key = action.payload;
      var index = state.indexOf(key);
      console.log("toggling key ".concat(key, " index ").concat(index));

      if (index === -1) {
        return [].concat(_toConsumableArray(state), [action.payload]);
      } else {
        var newState = state.slice(0);
        newState.splice(index, 1);
        return newState;
      }

    default:
      throw new Error('unknown action: ' + action.type);
  }
}

function LoadStateManager(_ref) {
  var children = _ref.children;

  var _useReducer = (0, _react.useReducer)(reducer, []),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var toggle = (0, _react.useCallback)(function (key) {
    dispatch({
      type: 'toggle',
      payload: key
    });
  }, [dispatch]);
  (0, _react.useEffect)(function () {
    console.log("current state: " + JSON.stringify(state));
  }, [state]);
  var manager = {
    state: state,
    toggle: toggle
  };
  return _react.default.createElement(LoadStateProvider, {
    value: manager
  }, children);
}