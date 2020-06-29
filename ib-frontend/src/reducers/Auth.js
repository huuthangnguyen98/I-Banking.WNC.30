import * as types from "../constants/ActionTypes";
const initalState = {
    role: 0,
};
const Auth = (state = initalState, action) => {
    switch (action.type) {
        case types.LOGIN_CUSTOMER:
            var newState = {
                role: 1,
            };
            state = newState;
            return state;
        case types.LOGIN_EMPLOYEE:
            newState = {
                role: 2,
            };
            state = newState;
            return state;
        case types.LOGIN_ADMIN:
            newState = {
                role: 3,
            };
            state = newState;
            return state;
        case types.LOGOUT:
            newState = {
                role: 0,
            };
            state = newState;
            return state;
        default:
            return state;
    }
};

export default Auth;
