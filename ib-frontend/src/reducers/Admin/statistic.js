import * as types from "../../constants/ActionTypes";
var intState = {
  list_transaction_to: [],
  list_transaction_from: [],
  total_to: 0,
  total_from: 0,
  bank_name: "",
};
let newState;

const statistic = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_STATISTIC:
      newState = action.data;
      return newState;
    default:
      return state;
  }
};

export default statistic;
