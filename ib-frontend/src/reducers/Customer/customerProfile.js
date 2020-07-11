import * as types from "../../constants/ActionTypes";

var intState = {};
let newState;
const customerProfile = (state = intState, action) => {
  switch (action.type) {
    case types.FETCH_INFO:
      newState = {
        name: action.data.name,
        email: action.data.email,
        phone: action.data.phone,
      };

      return newState;
    default:
      return state;
  }
};

export default customerProfile;
