import * as types from "../../constants/ActionTypes";
var intState = [];
let newState;
const notifications = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_NOTIFICATIONS:
      newState = action.data;
      return newState;
    default:
      return state;
  }
};

export default notifications;
