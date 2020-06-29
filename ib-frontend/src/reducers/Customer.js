import * as types from "../constants/ActionTypes";
let nextId = 1;
var intitalState = {
    user: {
        name: "Huu Thang Nguyen",
        email: "huuthangnguyen98@gmail.com",
        phone: "0977190471",
    },
    account: [
        {
            id: "123",
            amount: "10$",
            class: 0,
        },
        {
            id: "456",
            amount: "10$",
            class: 1,
        },
    ],
    rlist: [{ id: 0, name: "thang" }],
};
const customer = (state = intitalState, action) => {
    switch (action.type) {
        case types.FETCH_INFO:
            var cloneState = state;
            cloneState.data = action.data;
            var newState = cloneState;
            return newState;
        case types.FETCH_RECEIVERS:
            cloneState = state;
            cloneState.rlist = action.rlist;
            newState = cloneState;
            return newState;
        case types.ADD_RECEIVER:
            cloneState = state;
            const name = action.name;
            // cloneState.rlist = [...cloneState.rlist, action.receiver];
            cloneState.rlist = [...cloneState.rlist, { id: nextId++, name }];
            newState = cloneState;
            return newState;
        default:
            return state;
    }
};

export default customer;
