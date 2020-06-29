import * as types from "../../constants/ActionTypes";
var intState = [{ id: 0, name: "thang" }];
var newState;
const listReceivers = (state = intState, action) => {
    switch (action.type) {
        case types.ADD_RECEIVER:
            newState = [...state, { id: action.id, name: action.name }];
            return newState;
        case types.REMOVE_RECEIVER:
            newState = state.filter((item) => item.id !== action.id);
            return newState;
        case types.CHANGE_RECEIVER:
            newState = [...state];
            newState.forEach((item) => {
                if (item.id === action.id) item.name = action.name;
            });
            return newState;
        default:
            return state;
    }
};

export default listReceivers;
