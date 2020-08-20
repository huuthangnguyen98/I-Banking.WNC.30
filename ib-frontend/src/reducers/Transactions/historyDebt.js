import * as types from "../../constants/ActionTypes";
var intState = [];
let newState;
const historyDebt = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_DEBT:
      newState = action.data;
      return newState;
    default:
      return state;
  }
};

export default historyDebt;
// end here
