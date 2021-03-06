import * as types from "../../constants/ActionTypes";
var intState = [];
var newState;
const listDebtsByUser = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_DEBT_BY_USER:
      newState = action.data;
      return newState;
    case types.ADD_DEBT:
      newState = [action.debt, ...state];
      return newState;
    case types.CANCEL_DEBT_BY_USER:
      newState = [...state];
      newState.forEach((item) => {
        if (item.debtor_id === action.id) {
          item.description = action.des;
          item.status = 2;
        }
      });
      return newState;
    default:
      return state;
  }
};

export default listDebtsByUser;
// end here
