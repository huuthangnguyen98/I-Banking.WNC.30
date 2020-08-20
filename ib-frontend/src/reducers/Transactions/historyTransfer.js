import * as types from "../../constants/ActionTypes";
var intState = [];
let newState;
const historyTransfer = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_TRANSER:
      newState = action.data;
      console.log(newState);
      return newState;
    default:
      return state;
  }
};

export default historyTransfer;
//end here
