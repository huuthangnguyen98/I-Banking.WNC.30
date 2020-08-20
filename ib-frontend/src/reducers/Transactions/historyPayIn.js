import * as types from "../../constants/ActionTypes";
var intState = [];
let newState;
const historyPayIn = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_PAYIN:
      newState = action.data;
      return newState;
    default:
      return state;
  }
};

export default historyPayIn;
// end here
