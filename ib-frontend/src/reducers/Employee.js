import * as types from "../constants/ActionTypes";

const employee = (state = {}, action) => {
    switch (action.type) {
        case types.ADD_CUSTOMER:
            return state;
        default:
            return state;
    }
};

export default employee;
