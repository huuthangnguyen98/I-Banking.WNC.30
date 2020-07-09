import * as types from "../../constants/ActionTypes";
var intState = [{ id: 0, name: "thang_debt", amount: 100000 }];
var newState;
const listDebts = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_DEBTOR:
      newState = action.data;
      return newState;
    default:
      return state;
  }
};

export default listDebts;
