import * as types from "../constants/ActionTypes";
var data = {
    user: {
        name: "Huu Thang Nguyen",
        email: "huuthangnguyen98@gmail.com",
        phone: "0977190471",
    },
    account: [
        {
            id: "123",
            amount: "20$",
            class: 0,
        },
        {
            id: "456",
            amount: "20$",
            class: 1,
        },
    ],
    rlist: [{ id: "0", name: "ok" }],
};

//
export const fetchInfo = () => {
    return {
        type: types.FETCH_INFO,
        data,
    };
};

// export const fetchInfoReq = () => {
//     return (dispatch) => {
//         dispatch(fetchInfo());
//     };
// };
// export const fetchInfoReq = () => {
//     return (dispatch) => {
//         return callApi("", "GET", null).then((res) => {
//             dispatch(fetchInfo(res.data));
//         });
//     };
// };

const rlist = [];
export const fetchReceivers = () => {
    return {
        type: types.FETCH_RECEIVERS,
        rlist,
    };
};

// export const fetchReceiversReq = () => {
//     return (dispatch) => {
//         dispatch(fetchReceivers());
//     };
// };

export const addReceiver = (id, name) => {
    return {
        type: types.ADD_RECEIVER,
        name,
        id,
    };
};

// export const addReceiverReq = (id, name) => {
//     return (dispatch) => {
//         dispatch(addReceiver({ id, name }));
//     };
// };

export const removeReceiver = (id) => {
    return {
        type: types.REMOVE_RECEIVER,
        id,
    };
};

export const changeReceiver = (id, name) => {
    return {
        type: types.CHANGE_RECEIVER,
        id,
        name,
    };
};
