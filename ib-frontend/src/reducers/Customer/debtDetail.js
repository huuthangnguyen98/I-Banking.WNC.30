import * as types from "../../constants/ActionTypes";
var intState = {};
let newState;
const debtDetail = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_DEBT_DETAIL:
      newState = action.data;
      return newState;
    default:
      return state;
  }
};

export default debtDetail;
// end here