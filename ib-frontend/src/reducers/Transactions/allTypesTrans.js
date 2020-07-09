import * as types from "../../constants/ActionTypes";
var intState = [];
let newState;
const allTypesTrans = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_ALL_TYPES_TRANS:
      newState = action.data;
      return newState;

    default:
      return state;
  }
};

export default allTypesTrans;
