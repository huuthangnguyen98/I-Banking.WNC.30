import * as types from "../constants/ActionTypes";
var intState = {
  otpFrom: false,
};
let newState = {};
const UIState = (state = intState, action) => {
  switch (action.type) {
    case types.TOOGLE_OTP_FORM:
      var newState = Object.assign({}, state);
      newState.otpFrom = action.status;
      return newState;
    default:
      return state;
  }
};

export default UIState;
