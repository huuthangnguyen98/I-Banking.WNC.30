import * as types from "../../constants/ActionTypes";
var intState = [];
var newState;
const listDebtsToUser = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_DEBT_TO_USER:
      newState = action.data;
      return newState;
    case types.CANCEL_DEBT_TO_USER:
      newState = state.filter((item) => item.debtor_id !== action.id);
      return newState;
    default:
      return state;
  }
};

export default listDebtsToUser;
