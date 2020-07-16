import * as types from "../../constants/ActionTypes";
var intState = [];
let newState;
const notifications = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_NOTIFICATIONS:
      newState = action.data;
      return newState;
    case types.READ_A_NOTIFICATION:
      newState = [...state];
      newState.forEach((item) => {
        if (item.id === action.id) {
          item.status = 1;
        }
      });
      return newState;
    case types.READ_ALL_NOTIFI:
      newState = [...state];
      newState.forEach((item) => {
        item.status = 1;
      });
      return newState;
    default:
      return state;
  }
};

export default notifications;
