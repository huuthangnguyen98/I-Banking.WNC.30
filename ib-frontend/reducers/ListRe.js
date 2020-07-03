import * as types from "../constants/ActionTypes";
var intitalState = {
    rlist: [{ id: "0", name: "ok" }],
};
const ListRe = (state = intitalState, action) => {
    switch (action.type) {
        case types.FETCH_RECEIVERS:
            cloneState = r;
            newState = cloneState;
            return newState;
        case types.ADD_RECEIVER:
            cloneState = state;
            cloneState.rlist = [...cloneState.rlist, action.receiver];
            newState = cloneState;
            return newState;
        default:
            return state;
    }
};

export default ListRe;
