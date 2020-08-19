import * as types from "../../constants/ActionTypes";
var intState = [];

let newState;
const listAccount = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_ACCOUNT:
      newState = action.data;
      return newState;
    default:
      return state;
  }
};

export default listAccount;
