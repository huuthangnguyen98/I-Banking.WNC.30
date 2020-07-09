import * as types from "../../constants/ActionTypes";
var intState = [];
let newState;
const listEmployee = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_LIST_EMPLOYEE:
      newState = action.data;
      return newState;
    case types.ADD_EMPLOYEE:
      newState = [...state, action.emp];
      return newState;
    case types.UPDATE_EMPLOYEE:
      newState = [...state];
      newState.forEach((item) => {
        if (item.user_id === action.id) {
          if (action.name !== "") item.full_name = action.name;
        }
      });
      return newState;
    case types.REMOVE_EMPLOYEE:
      newState = state.filter((item) => item.user_id !== action.id);
      return newState;
    default:
      return state;
  }
};

export default listEmployee;
