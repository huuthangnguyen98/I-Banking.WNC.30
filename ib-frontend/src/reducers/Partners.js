import * as types from "../constants/ActionTypes";
const initalState = [];
var newState;
const Partners = (state = initalState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_PARTNER:
      newState = action.data;
      return newState;
    default:
      return state;
  }
};

export default Partners;
//end here
