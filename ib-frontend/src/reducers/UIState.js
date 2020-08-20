import * as types from "../constants/ActionTypes";
var intState = {
  otpFrom: false,
  hasNewNotifi: false,
  showNotifi: false,
  num: 0,
  spinner: false,
};
let newState;
const UIState = (state = intState, action) => {
  switch (action.type) {
    case types.TOOGLE_OTP_FORM:
      newState = Object.assign({}, state);
      newState.otpFrom = action.status;
      return newState;
    case types.TOGGLE_NEWNOTIFI:
      newState = Object.assign({}, state);
      newState.hasNewNotifi = action.status;
      newState.num = action.num;
      return newState;
    case types.TOGGLE_SHOW_NOTIFI:
      newState = Object.assign({}, state);
      newState.showNotifi = !state.showNotifi;
      return newState;
    case types.HIDE_NOTIFI:
      newState = Object.assign({}, state);
      newState.showNotifi = false;
      return newState;
    case types.SHOW_SPINNER:
      newState = Object.assign({}, state);
      newState.spinner = true;
      return newState;
    case types.HIDE_SPINNER:
      newState = Object.assign({}, state);
      newState.spinner = false;
      return newState;
    default:
      return state;
  }
};

export default UIState;
//end here
